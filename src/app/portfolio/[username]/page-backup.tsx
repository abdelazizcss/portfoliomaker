'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Avatar,
  Button,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  IconButton,
  Link as ChakraLink,
  Divider,
  SimpleGrid,
  Wrap,
  WrapItem,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  useColorMode,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Center,
  Progress,
  ScaleFade,
  useBreakpointValue,
  useTheme,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaDownload,
  FaExternalLinkAlt,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FaYoutube,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaCalendar,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaLanguage,
  FaAward,
  FaUsers,
  FaLightbulb,
  FaChevronDown,
  FaQuoteLeft,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DatabaseUser, Project } from '@/types';

interface PortfolioPageProps {
  params: {
    username: string;
  };
}

const ProfessionalPortfolioPage = ({ params }: PortfolioPageProps) => {
  const [user, setUser] = useState<DatabaseUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();
  
  // Add scroll animation control
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional & Neutral color scheme
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white, gray.100)',
    'linear(to-br, gray.900, gray.800, gray.950)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('gray.700', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const heroGradient = useColorModeValue(
    'linear(135deg, gray.700, gray.600, gray.500)',
    'linear(135deg, gray.700, gray.600, gray.800)'
  );

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`/api/user/public/${username}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.user);
        }

        // Fetch projects
        const projectsResponse = await fetch(`/api/projects?username=${username}`);
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData.projects || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const getSocialIcon = (platform: string) => {
    const icons = {
      github: FaGithub,
      linkedin: FaLinkedin,
      twitter: FaTwitter,
      website: FaGlobe,
      instagram: FaInstagram,
      behance: FaBehance,
      dribbble: FaDribbble,
      youtube: FaYoutube,
      facebook: FaFacebook,
    };
    return icons[platform as keyof typeof icons] || FaGlobe;
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      github: 'gray.700',
      linkedin: 'blue.600',
      twitter: 'blue.400',
      website: 'green.500',
      instagram: 'pink.500',
      behance: 'blue.500',
      dribbble: 'pink.400',
      youtube: 'red.500',
      facebook: 'blue.700',
    };
    return colors[platform as keyof typeof colors] || 'gray.500';
  };

  // Add smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" bg={bgGradient}>
        <Container maxW="7xl" py={8}>
          <VStack spacing={8}>
            <Center>
              <SkeletonCircle size="32" />
            </Center>
            <VStack spacing={4} w="full">
              <Skeleton height="40px" w="300px" />
              <Skeleton height="20px" w="200px" />
              <Skeleton height="60px" w="500px" />
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {[1, 2, 3].map((i) => (
                <Card key={i} bg={cardBg}>
                  <CardBody>
                    <Skeleton height="200px" mb={4} />
                    <SkeletonText noOfLines={3} />
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box minH="100vh" bg={bgGradient}>
        <Container maxW="7xl" py={20}>
          <Center>
            <VStack spacing={6}>
              <Heading size="xl" color={textColor}>Portfolio Not Found</Heading>
              <Text color={mutedColor}>The portfolio you're looking for doesn't exist.</Text>
              <Button as={Link} href="/" colorScheme="blue" size="lg">
                Go Home
              </Button>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  const socialLinks = [
    { platform: 'github', url: user.github_username ? `https://github.com/${user.github_username}` : '', label: 'GitHub' },
    { platform: 'linkedin', url: user.linkedin, label: 'LinkedIn' },
    { platform: 'twitter', url: user.twitter, label: 'Twitter' },
    { platform: 'website', url: user.website, label: 'Website' },
    { platform: 'instagram', url: user.instagram, label: 'Instagram' },
    { platform: 'behance', url: user.behance, label: 'Behance' },
    { platform: 'dribbble', url: user.dribbble, label: 'Dribbble' },
    { platform: 'youtube', url: user.youtube, label: 'YouTube' },
    { platform: 'facebook', url: user.facebook, label: 'Facebook' },
  ].filter(link => link.url);

  return (
    <Box minH="100vh" bg={bgGradient}>
      {/* Hero Section */}
      <Box
        position="relative"
        bgGradient={heroGradient}
        py={{ base: 24, md: 32 }}
        overflow="hidden"
        borderRadius={{ base: "0", md: "0 0 3rem 3rem" }}
        boxShadow="0 10px 30px rgba(0,0,0,0.1)"
      >
        {/* Enhanced Background Pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.07"
          backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDEtMyAyLTMgMiAwIDMgMSAzIDNzLTEgMy0zIDNjLTEgMC0yLTEtMi0zem0tMTYgMGMwLTIgMS0zIDItMyAyIDAgMyAxIDMgM3MtMSAzLTMgM2MtMSAwLTItMS0yLTN6bS0xNiAwYzAtMiAxLTMgMi0zIDIgMCAzIDEgMyAzcy0xIDMtMyAzYy0xIDAtMi0xLTItM3oiLz48L2c+PC9nPjwvc3ZnPg==')"
          className="parallax-bg"
        />
        
        {/* Floating decorative elements with enhanced styles */}
        <Box 
          position="absolute" 
          top="15%" 
          left="5%" 
          w="150px" 
          h="150px" 
          borderRadius="full" 
          bg="linear-gradient(135deg, whiteAlpha.100, whiteAlpha.200)"
          backdropFilter="blur(5px)"
          className="floating-up"
          style={{ animationDelay: "0s" }}
        />
        <Box 
          position="absolute" 
          bottom="20%" 
          right="10%" 
          w="100px" 
          h="100px" 
          borderRadius="full" 
          bg="linear-gradient(135deg, whiteAlpha.100, whiteAlpha.200)"
          backdropFilter="blur(5px)"
          className="floating-down"
          style={{ animationDelay: "1s" }}
        />
        <Box 
          position="absolute" 
          top="30%" 
          right="15%" 
          w="80px" 
          h="80px" 
          borderRadius="full" 
          bg="linear-gradient(135deg, whiteAlpha.200, whiteAlpha.300)"
          backdropFilter="blur(5px)"
          className="floating-up"
          style={{ animationDelay: "0.5s" }}
        />
        
        <Container maxW="7xl" position="relative" zIndex="1">
          <Grid 
            templateColumns={{ base: '1fr', lg: '3fr 2fr' }} 
            gap={{ base: 12, lg: 20 }} 
            alignItems="center"
            justifyContent="space-between"
            maxW="7xl"
            mx="auto"
          >
            {/* Content Section with enhanced spacing and structure */}
            <VStack align={{ base: "center", lg: "start" }} spacing={8} color="white">
              <ScaleFade initialScale={0.9} in={true}>
                <VStack 
                  align={{ base: "center", lg: "start" }} 
                  spacing={5} 
                  className="stagger-reveal"
                  w="full"
                >
                  <Badge
                    bg="whiteAlpha.300"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    backdropFilter="blur(7px)"
                    boxShadow="0 0 15px rgba(255,255,255,0.1)"
                  >
                    {user.field_of_work || 'Professional'}
                  </Badge>
                  
                  <Heading
                    size={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    fontWeight="900"
                    lineHeight="100%"
                    letterSpacing="-0.01em"
                    textAlign={{ base: "center", lg: "left" }}
                    className="ultra-gradient-text"
                    textShadow="0 2px 15px rgba(0,0,0,0.3)"
                    mb={2}
                  >
                    {user.name}
                  </Heading>
                  
                  <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="600"
                    opacity="0.95"
                    textAlign={{ base: "center", lg: "left" }}
                    letterSpacing="wide"
                    background="linear-gradient(90deg, white, rgba(255,255,255,0.8))"
                    backgroundClip="text"
                    className="gpu-accelerated"
                  >
                    {user.job_title}
                  </Text>
                  
                  {user.years_of_experience && user.years_of_experience > 0 && (
                    <HStack 
                      spacing={3} 
                      bg="whiteAlpha.200" 
                      backdropFilter="blur(7px)" 
                      px={4} 
                      py={2} 
                      borderRadius="full"
                      boxShadow="0 0 15px rgba(255,255,255,0.05)"
                    >
                      <FaBriefcase />
                      <Text fontSize="lg" opacity="0.9">
                        {user.years_of_experience}+ years of experience
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </ScaleFade>

              {user.bio && (
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  lineHeight="tall"
                  opacity="0.9"
                  maxW="2xl"
                  textAlign={{ base: "center", lg: "left" }}
                  p={{ base: 4, lg: 0 }}
                  bg={{ base: "whiteAlpha.100", lg: "transparent" }}
                  borderRadius={{ base: "xl", lg: "none" }}
                  backdropFilter={{ base: "blur(7px)", lg: "none" }}
                  className="fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  {user.bio}
                </Text>
              )}

              {/* Contact & Social Links with enhanced styling */}
              <VStack 
                align={{ base: "center", lg: "start" }} 
                spacing={5} 
                w="full"
                className="fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                {/* Contact Info */}
                <HStack 
                  spacing={6} 
                  flexWrap="wrap" 
                  justify={{ base: "center", lg: "flex-start" }}
                  bg="whiteAlpha.200"
                  backdropFilter="blur(7px)"
                  py={3}
                  px={5}
                  borderRadius="xl"
                  boxShadow="0 0 20px rgba(255,255,255,0.05)"
                >
                  {user.email && (
                    <HStack spacing={2} opacity="0.95">
                      <Box 
                        p={2} 
                        borderRadius="full" 
                        bg="whiteAlpha.300"
                      >
                        <FaEnvelope size="16" />
                      </Box>
                      <Text fontSize="sm">{user.email}</Text>
                    </HStack>
                  )}
                  {user.phone && (
                    <HStack spacing={2} opacity="0.95">
                      <Box 
                        p={2} 
                        borderRadius="full" 
                        bg="whiteAlpha.300"
                      >
                        <FaPhone size="16" />
                      </Box>
                      <Text fontSize="sm">{user.phone}</Text>
                    </HStack>
                  )}
                  {user.location && (
                    <HStack spacing={2} opacity="0.95">
                      <Box 
                        p={2} 
                        borderRadius="full" 
                        bg="whiteAlpha.300"
                      >
                        <FaMapMarkerAlt size="16" />
                      </Box>
                      <Text fontSize="sm">{user.location}</Text>
                    </HStack>
                  )}
                </HStack>

                {/* Social Links with enhanced design */}
                {socialLinks.length > 0 && (
                  <HStack 
                    spacing={4} 
                    pt={2} 
                    className="stagger-reveal" 
                    justify={{ base: "center", lg: "flex-start" }}
                  >
                    {socialLinks.map((link, index) => {
                      const Icon = getSocialIcon(link.platform);
                      const platformColor = getPlatformColor(link.platform);
                      
                      return (
                        <Tooltip key={index} label={link.label} hasArrow>
                          <IconButton
                            as="a"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            icon={<Icon />}
                            size="lg"
                            variant="ghost"
                            color="white"
                            bg="whiteAlpha.300"
                            borderRadius="xl"
                            _hover={{
                              bg: 'whiteAlpha.400',
                              transform: 'translateY(-3px) scale(1.1)',
                              shadow: '0 10px 20px rgba(0,0,0,0.2)',
                              color: platformColor,
                            }}
                            transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
                            className="gpu-accelerated"
                          />
                        </Tooltip>
                      );
                    })}
                  </HStack>
                )}

                {/* CTA Buttons with enhanced design */}
                <HStack 
                  spacing={4} 
                  pt={4}
                  flexDir={{ base: "column", sm: "row" }}
                  align={{ base: "stretch", sm: "center" }}
                  justify={{ base: "center", lg: "flex-start" }}
                  w={{ base: "full", sm: "auto" }}
                >
                  {user.cv_url && (
                    <Button
                      as="a"
                      href={user.cv_url}
                      target="_blank"
                      leftIcon={<FaDownload />}
                      size="lg"
                      bg="white"
                      color="gray.700"
                      _hover={{
                        bg: 'whiteAlpha.900',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      }}
                      transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
                      shadow="xl"
                      borderRadius="xl"
                      className="professional-button-2025 hover-glow"
                      px={8}
                      w={{ base: "full", sm: "auto" }}
                    >
                      Download Resume
                    </Button>
                  )}
                  
                  <Button
                    as="a"
                    href={`mailto:${user.email}`}
                    leftIcon={<FaEnvelope />}
                    size="lg"
                    variant="outline"
                    borderWidth="2px"
                    borderColor="white"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.300',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    }}
                    transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
                    className="professional-button-2025"
                    borderRadius="xl"
                    px={8}
                    backdropFilter="blur(7px)"
                    w={{ base: "full", sm: "auto" }}
                  >
                    Get In Touch
                  </Button>
                </HStack>
              </VStack>
            </VStack>

            {/* Avatar Section with enhanced styling */}
            <Center>
              <Box
                position="relative"
                p={{ base: 3, md: 4 }}
                bg="linear-gradient(135deg, whiteAlpha.300, whiteAlpha.100)"
                borderRadius="full"
                backdropFilter="blur(15px)"
                className="glass-morphism"
                _hover={{
                  transform: "scale(1.05)",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
                }}
                transition="all 0.3s ease"
                boxShadow="0 15px 35px rgba(0,0,0,0.2)"
              >
                {/* Outer glowing ring */}
                <Box
                  position="absolute"
                  top="-10px"
                  left="-10px"
                  right="-10px"
                  bottom="-10px"
                  borderRadius="full"
                  bg="transparent"
                  border="2px solid"
                  borderColor="whiteAlpha.400"
                  opacity="0.6"
                  className="modern-pulse"
                />
                
                {/* Inner pulsing ring */}
                <Box
                  position="absolute"
                  top="-5px"
                  left="-5px"
                  right="-5px"
                  bottom="-5px"
                  borderRadius="full"
                  bg="transparent"
                  border="3px solid"
                  borderColor="whiteAlpha.300"
                  opacity="0.8"
                  className="modern-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                
                <Avatar
                  size={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  name={user.name}
                  src={user.avatar_url || ''}
                  border="5px solid"
                  borderColor="white"
                  shadow="2xl"
                  className="gpu-accelerated"
                />
                
                {user.field_of_work && (
                  <Badge
                    position="absolute"
                    bottom={{ base: 2, md: 4 }}
                    right={{ base: 2, md: 4 }}
                    bg="white"
                    color="gray.700"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize={{ base: "2xs", md: "xs" }}
                    fontWeight="bold"
                    shadow="lg"
                    className="professional-hover-lift"
                    boxShadow="0 10px 20px rgba(0,0,0,0.2)"
                  >
                    {user.field_of_work}
                  </Badge>
                )}
              </Box>
            </Center>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" py={20} px={{ base: 4, md: 6, lg: 8 }}>
        <VStack spacing={24} align="stretch">
          
          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <Box id="skills">
              <VStack align="stretch" spacing={10}>
                {/* Section Header with enhanced styling */}
                <Flex 
                  align="center" 
                  pb={5}
                  position="relative"
                  mb={8}
                  className="section-title-container"
                >
                  <Box 
                    position="absolute"
                    left="0"
                    bottom="0"
                    width="100%"
                    height="3px"
                    bg={`linear-gradient(to right, ${accentColor}, transparent)`}
                    borderRadius="full"
                  />
                  <HStack spacing={5} align="center">
                    <Box 
                      w={12} 
                      h={12} 
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="md"
                    >
                      <FaLightbulb 
                        size={20} 
                        color={useColorModeValue('gray.500', 'gray.300')}
                      />
                    </Box>
                    <Heading 
                      size="xl" 
                      color={textColor}
                      className={scrollY > 100 ? "fade-in-up" : ""}
                      fontWeight="700"
                      letterSpacing="-0.01em"
                    >
                      Skills & Expertise
                    </Heading>
                  </HStack>
                </Flex>
                
                {/* Skills Card with enhanced design */}
                <Card 
                  bg={cardBg} 
                  shadow="2xl" 
                  borderRadius="3xl" 
                  border="1px" 
                  borderColor={borderColor}
                  className={scrollY > 150 ? "fade-in-up" : "opacity-0"}
                  style={{ 
                    transitionDelay: "0.1s", 
                    opacity: scrollY > 150 ? 1 : 0,
                    transition: "opacity 0.5s ease, transform 0.5s ease"
                  }}
                  position="relative"
                  overflow="hidden"
                  p={3}
                  mx={{ base: 0, md: 4 }}
                >
                  {/* Decorative gradient background */}
                  <Box
                    position="absolute"
                    top="-50%"
                    left="-20%"
                    width="70%"
                    height="200%"
                    bg="linear-gradient(135deg, gray.50, transparent)"
                    opacity="0.05"
                    transform="rotate(-30deg)"
                  />
                  
                  <CardBody p={{ base: 6, md: 10 }}>
                    <Wrap 
                      spacing={{ base: 3, md: 5 }} 
                      justify={{ base: "center", md: "flex-start" }}
                    >
                      {user.skills.map((skill, index) => (
                        <WrapItem key={index}>
                          <Badge
                            px={5}
                            py={3}
                            bg={useColorModeValue('gray.50', 'gray.700')}
                            color={accentColor}
                            borderRadius="full"
                            fontSize={{ base: "xs", md: "sm" }}
                            fontWeight="medium"
                            border="1px"
                            borderColor={useColorModeValue('gray.200', 'gray.600')}
                            className="skill-badge"
                            _hover={{
                              transform: 'translateY(-3px)',
                              shadow: 'xl',
                              bg: useColorModeValue('gray.100', 'gray.600')
                            }}
                            transition="all 0.3s cubic-bezier(0.23, 1, 0.320, 1)"
                            boxShadow="0 3px 10px rgba(0,0,0,0.08)"
                            style={{ 
                              transitionDelay: `${index * 0.05}s`,
                              opacity: scrollY > 200 ? 1 : 0,
                              transform: scrollY > 200 
                                ? 'translateY(0)' 
                                : 'translateY(20px)',
                              transition: "opacity 0.5s ease, transform 0.5s ease"
                            }}
                            position="relative"
                            _before={{
                              content: '""',
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              borderRadius: 'full',
                              bg: 'transparent',
                              border: '1px solid',
                              borderColor: useColorModeValue('gray.200', 'gray.600'),
                              opacity: '0.5',
                              transform: 'scale(1.05)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {skill}
                          </Badge>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </CardBody>
                </Card>
              </VStack>
            </Box>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <Box id="projects">
              <VStack align="stretch" spacing={10}>
                {/* Section Header with matching style to skills section */}
                <Flex 
                  align="center" 
                  pb={5}
                  position="relative"
                  mb={8}
                  className="section-title-container"
                >
                  <Box 
                    position="absolute"
                    left="0"
                    bottom="0"
                    width="100%"
                    height="3px"
                    bg={`linear-gradient(to right, ${accentColor}, transparent)`}
                    borderRadius="full"
                  />
                  <HStack spacing={5} align="center">
                    <Box 
                      w={12} 
                      h={12} 
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="md"
                    >
                      <FaBriefcase 
                        size={20} 
                        color={useColorModeValue('gray.500', 'gray.300')}
                      />
                    </Box>
                    <Heading 
                      size="xl" 
                      color={textColor}
                      className={scrollY > 300 ? "fade-in-up" : ""}
                      fontWeight="700"
                      letterSpacing="-0.01em"
                    >
                      Featured Projects
                    </Heading>
                  </HStack>
                </Flex>
                
                {/* Enhanced Project Grid */}
                <SimpleGrid 
                  columns={{ base: 1, md: 2, lg: 3 }} 
                  spacing={{ base: 8, md: 10 }} 
                  w="full"
                  mx={{ base: 0, md: 4 }}
                >
                  {projects.slice(0, 6).map((project, index) => (
                    <Card
                      key={index}
                      bg={cardBg}
                      shadow="xl"
                      borderRadius="2xl"
                      border="1px"
                      borderColor={borderColor}
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        onOpen();
                      }}
                      className="ultra-premium-card"
                      _hover={{
                        transform: 'translateY(-10px)',
                        shadow: '2xl',
                        borderColor: 'gray.400',
                      }}
                      transition="all 0.4s cubic-bezier(0.23, 1, 0.320, 1)"
                      style={{ 
                        transitionDelay: `${index * 0.1}s`,
                        opacity: scrollY > 350 ? 1 : 0,
                        transform: scrollY > 350 
                          ? 'translateY(0)' 
                          : 'translateY(40px)',
                        transition: "opacity 0.6s ease, transform 0.6s ease"
                      }}
                      position="relative"
                    >
                      {/* Decorative corner element */}
                      <Box
                        position="absolute"
                        top="0"
                        right="0"
                        borderWidth="30px"
                        borderColor={`transparent ${useColorModeValue('gray.50', 'gray.700')} transparent transparent`}
                        opacity="0.2"
                        zIndex="1"
                      />
                    
                      {project.image_url && (
                        <Box h="220px" overflow="hidden" position="relative">
                          {/* Image overlay gradient */}
                          <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)"
                            zIndex="1"
                          />
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            w="full"
                            h="full"
                            objectFit="cover"
                            transition="transform 0.7s cubic-bezier(0.23, 1, 0.320, 1)"
                            _hover={{ transform: 'scale(1.1)' }}
                            className="gpu-accelerated"
                          />
                          
                          {/* Project type badge overlayed on image */}
                          <Badge
                            position="absolute"
                            top="4"
                            left="4"
                            colorScheme="gray"
                            variant="solid"
                            bg="rgba(255,255,255,0.85)"
                            color="gray.800"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            zIndex="2"
                            boxShadow="0 2px 8px rgba(0,0,0,0.15)"
                          >
                            {project.project_type || 'Project'}
                          </Badge>
                          
                          {/* Client badge if available */}
                          {project.client && (
                            <Badge
                              position="absolute"
                              bottom="4"
                              right="4"
                              colorScheme="gray"
                              variant="solid"
                              bg="rgba(0,0,0,0.5)"
                              color="white"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                              zIndex="2"
                              boxShadow="0 2px 8px rgba(0,0,0,0.15)"
                            >
                              {project.client}
                            </Badge>
                          )}
                        </Box>
                      )}
                      
                      <CardBody p={6}>
                        <VStack align="start" spacing={4}>
                          {/* Project Title and Description */}
                          <VStack align="start" spacing={3} w="full">
                            <Heading 
                              size="md" 
                              color={textColor} 
                              noOfLines={2}
                              borderBottom="2px solid"
                              borderColor={borderColor}
                              pb={2}
                              w="full"
                            >
                              {project.title}
                            </Heading>
                            <Text 
                              color={mutedColor} 
                              fontSize="sm" 
                              noOfLines={3}
                              lineHeight="tall"
                            >
                              {project.description}
                            </Text>
                          </VStack>

                          {/* Technologies */}
                          {project.technologies && project.technologies.length > 0 && (
                            <Wrap spacing={2} pt={2} opacity={0.9}>
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <WrapItem key={techIndex}>
                                  <Badge
                                    variant="subtle"
                                    colorScheme="gray"
                                    fontSize="xs"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    boxShadow="0 2px 5px rgba(0,0,0,0.08)"
                                    _hover={{
                                      transform: 'translateY(-1px)',
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}
                                    transition="all 0.2s ease"
                                  >
                                    {tech}
                                  </Badge>
                                </WrapItem>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge 
                                  variant="outline" 
                                  colorScheme="gray" 
                                  fontSize="xs"
                                  px={2}
                                  py={1}
                                  borderRadius="full"
                                >
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </Wrap>
                          )}

                          {/* View Project Button */}
                          <HStack spacing={4} pt={2} justify="flex-start" w="full">
                            {project.url && (
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<FaExternalLinkAlt />}
                                color={accentColor}
                                borderColor={borderColor}
                                as="a"
                                href={project.url}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                                _hover={{
                                  bg: useColorModeValue('gray.50', 'gray.700'),
                                  transform: 'translateY(-2px)'
                                }}
                                transition="all 0.2s ease"
                                className="professional-button-2025"
                                borderRadius="full"
                              >
                                View Project
                              </Button>
                            )}
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

        </VStack>
      </Container>
      
      {/* Professional Footer */}
      <Box
        bg="linear-gradient(to bottom, transparent, rgba(0,0,0,0.05))"
        py={12}
        position="relative"
        overflow="hidden"
        className="flowing-gradient"
      >
        {/* Decorative elements */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="1px"
          bg="linear-gradient(to right, transparent, gray.200, transparent)"
          opacity="0.5"
        />
        
        <Container maxW="7xl">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "2fr 1fr 1fr" }}
            gap={{ base: 10, md: 8 }}
          >
            {/* About Column */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="md" color={textColor} className="animated-underline">
                  {user.name}
                </Heading>
                
                <Text fontSize="sm" color={mutedColor} maxW="md">
                  {user.bio ? user.bio.substring(0, 150) + (user.bio.length > 150 ? '...' : '') : 'Professional portfolio showcasing my work, skills, and experience.'}
                </Text>
                
                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <HStack spacing={4} pt={2}>
                    {socialLinks.slice(0, 5).map((link, index) => {
                      const Icon = getSocialIcon(link.platform);
                      return (
                        <IconButton
                          key={index}
                          as="a"
                          href={link.url}
                          target="_blank"
                          aria-label={link.label}
                          icon={<Icon size="14" />}
                          size="sm"
                          variant="ghost"
                          color={mutedColor}
                          _hover={{
                            color: textColor,
                            transform: 'translateY(-2px)'
                          }}
                          transition="all 0.2s ease"
                        />
                      );
                    })}
                  </HStack>
                )}
              </VStack>
            </GridItem>
            
            {/* Quick Links */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="md" color={textColor} className="animated-underline">
                  Quick Links
                </Heading>
                
                <VStack align="start" spacing={2}>
                  {projects.length > 0 && (
                    <Link
                      onClick={() => scrollToSection('projects')}
                      color={mutedColor}
                      _hover={{ color: textColor, textDecoration: 'none' }}
                      cursor="pointer"
                      fontSize="sm"
                      fontWeight="medium"
                      display="flex"
                      alignItems="center"
                    >
                      <FaChevronDown transform="rotate(-90deg)" style={{ marginRight: '8px' }} />
                      Projects
                    </Link>
                  )}
                  
                  {user.skills && user.skills.length > 0 && (
                    <Link
                      onClick={() => scrollToSection('skills')}
                      color={mutedColor}
                      _hover={{ color: textColor, textDecoration: 'none' }}
                      cursor="pointer"
                      fontSize="sm"
                      fontWeight="medium"
                      display="flex"
                      alignItems="center"
                    >
                      <FaChevronDown transform="rotate(-90deg)" style={{ marginRight: '8px' }} />
                      Skills
                    </Link>
                  )}
                  
                  {user.cv_url && (
                    <Button
                      as="a"
                      variant="link"
                      size="sm"
                      color={mutedColor}
                      leftIcon={<FaDownload size="12" />}
                      href={user.cv_url}
                      target="_blank"
                      _hover={{ color: textColor, textDecoration: 'none' }}
                    >
                      Resume
                    </Button>
                  )}
                </VStack>
              </VStack>
            </GridItem>
            
            {/* Contact Info */}
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading size="md" color={textColor} className="animated-underline">
                  Contact
                </Heading>
                
                <VStack align="start" spacing={3}>
                  {user.email && (
                    <HStack spacing={3}>
                      <FaEnvelope size="14" color={mutedColor} />
                      <Text fontSize="sm" color={mutedColor}>
                        {user.email}
                      </Text>
                    </HStack>
                  )}
                  
                  {user.phone && (
                    <HStack spacing={3}>
                      <FaPhone size="14" color={mutedColor} />
                      <Text fontSize="sm" color={mutedColor}>
                        {user.phone}
                      </Text>
                    </HStack>
                  )}
                  
                  {user.location && (
                    <HStack spacing={3}>
                      <FaMapMarkerAlt size="14" color={mutedColor} />
                      <Text fontSize="sm" color={mutedColor}>
                        {user.location}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
          
          <Divider my={8} opacity="0.2" />
          
          <HStack justify="space-between" flexWrap="wrap">
            <Text fontSize="xs" color={mutedColor}>
              © {new Date().getFullYear()} {user.name}. All rights reserved.
            </Text>
            
            <Text fontSize="xs" color={mutedColor}>
              Designed with <Box as="span" color="red.400">♥</Box> | Portfolio
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* Floating Action Button for quick navigation */}
      <Box
        position="fixed"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
        zIndex={10}
        className="fade-in-up"
        style={{ 
          opacity: scrollY > 300 ? 1 : 0,
          transform: scrollY > 300 ? 'translateY(0)' : 'translateY(20px)',
          transition: "all 0.3s ease",
          visibility: scrollY > 300 ? "visible" : "hidden"
        }}
      >
        <IconButton
          as="a"
          href="#top"
          aria-label="Back to top"
          icon={<FaChevronDown style={{ transform: 'rotate(180deg)' }} />}
          size="lg"
          colorScheme="gray"
          rounded="full"
          w={14}
          h={14}
          boxShadow="lg"
          bg={useColorModeValue('white', 'gray.800')}
          _hover={{
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          }}
          transition="all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
          className="harmonious-scale"
        />
      </Box>
      
      {/* Project Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay 
          backdropFilter="blur(20px)"
          bg="blackAlpha.700"
        />
        <ModalContent 
          mx={{ base: 4, md: 6 }}
          bg={cardBg} 
          borderRadius="3xl"
          className="glass-morphism layered-shadow"
          overflow="hidden"
          position="relative"
          borderColor={borderColor}
          borderWidth="1px"
          boxShadow="0 25px 50px rgba(0,0,0,0.3)"
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top="0"
            right="0"
            width="300px"
            height="300px"
            bg="linear-gradient(135deg, gray.50, transparent)"
            opacity="0.03"
            borderRadius="full"
            transform="translate(50%, -50%)"
          />
          
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="200px"
            height="200px"
            bg="linear-gradient(135deg, gray.50, transparent)"
            opacity="0.03"
            borderRadius="full"
            transform="translate(-30%, 30%)"
          />
          
          <ModalHeader pb={4} pt={6} px={8}>
            <ModalCloseButton 
              size="lg" 
              borderRadius="full" 
              bg={useColorModeValue('gray.100', 'gray.700')}
              _hover={{
                bg: useColorModeValue('gray.200', 'gray.600'),
                transform: 'rotate(90deg)'
              }}
              transition="all 0.3s ease"
              mx={2}
              my={2}
            />
            {selectedProject && (
              <VStack align="start" spacing={3} className="fade-in-up" pt={4}>
                <HStack spacing={4}>
                  <Badge 
                    colorScheme="gray" 
                    px={4} 
                    py={1.5} 
                    borderRadius="full"
                    className="skill-badge"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                  >
                    {selectedProject.project_type || 'Project'}
                  </Badge>
                  {selectedProject.client && (
                    <HStack
                      spacing={2}
                      style={{ animationDelay: "0.1s" }}
                      className="fade-in-up"
                      bg={useColorModeValue('gray.50', 'gray.800')}
                      px={4}
                      py={1.5}
                      borderRadius="full"
                      boxShadow="0 2px 8px rgba(0,0,0,0.05)"
                    >
                      <FaBriefcase size="12" />
                      <Text 
                        fontSize="sm" 
                        fontWeight="medium"
                        color={mutedColor}
                      >
                        Client: {selectedProject.client}
                      </Text>
                    </HStack>
                  )}
                </HStack>
                
                <Heading 
                  size="lg" 
                  className="animated-underline"
                  pb={2}
                  lineHeight="1.3"
                >
                  {selectedProject.title}
                </Heading>
              </VStack>
            )}
          </ModalHeader>
          
          <ModalBody pb={8} px={8}>
            {selectedProject && (
              <VStack spacing={8} align="stretch">
                {selectedProject.image_url && (
                  <Box 
                    borderRadius="2xl" 
                    overflow="hidden"
                    className="fade-in-up" 
                    style={{ animationDelay: "0.2s" }}
                    boxShadow="0 5px 20px rgba(0,0,0,0.1)"
                    border="1px solid"
                    borderColor={borderColor}
                    position="relative"
                  >
                    <Image
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      w="full"
                      h={{ base: "200px", md: "350px" }}
                      objectFit="cover"
                      transition="transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)"
                      _hover={{ transform: 'scale(1.03)' }}
                      className="gpu-accelerated"
                    />
                  </Box>
                )}
                
                <Grid 
                  templateColumns={{ base: "1fr", md: "3fr 1fr" }}
                  gap={8}
                  className="fade-in-up" 
                  style={{ animationDelay: "0.3s" }}
                >
                  <GridItem>
                    <VStack align="start" spacing={5}>
                      <Heading size="md" color={textColor}>Project Details</Heading>
                      
                      <Text 
                        lineHeight="tall" 
                        color={textColor}
                        fontSize="md"
                        p={5}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        borderRadius="xl"
                        boxShadow="0 2px 10px rgba(0,0,0,0.05)"
                      >
                        {selectedProject.description}
                      </Text>
                    </VStack>
                  </GridItem>
                  
                  <GridItem>
                    <VStack align="start" spacing={6} w="full">
                      {/* Date Information */}
                      {(selectedProject.start_date || selectedProject.end_date) && (
                        <VStack align="start" spacing={2} w="full">
                          <Heading size="xs" color={mutedColor} textTransform="uppercase">
                            Timeline
                          </Heading>
                          
                          <HStack 
                            spacing={3}
                            p={3}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            borderRadius="lg"
                            w="full"
                          >
                            <Box 
                              p={2} 
                              borderRadius="md" 
                              bg={useColorModeValue('gray.100', 'gray.700')}
                              color={mutedColor}
                            >
                              <FaCalendar size={14} />
                            </Box>
                            <Text fontSize="sm" color={textColor}>
                              {selectedProject.start_date && new Date(selectedProject.start_date).toLocaleDateString()}
                              {selectedProject.start_date && selectedProject.end_date && ' - '}
                              {selectedProject.end_date && new Date(selectedProject.end_date).toLocaleDateString()}
                            </Text>
                          </HStack>
                        </VStack>
                      )}
                      
                      {/* Technologies Used */}
                      {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                        <VStack align="start" spacing={2} w="full">
                          <Heading size="xs" color={mutedColor} textTransform="uppercase">
                            Technologies Used
                          </Heading>
                          
                          <Wrap spacing={2} w="full">
                            {selectedProject.technologies.map((tech, index) => (
                              <WrapItem key={index}>
                                <Badge
                                  colorScheme="gray"
                                  variant="subtle"
                                  bg={useColorModeValue('gray.100', 'gray.700')}
                                  px={3}
                                  py={1.5}
                                  borderRadius="full"
                                  className="skill-badge"
                                  style={{ animationDelay: `${0.4 + (index * 0.05)}s` }}
                                  fontSize="xs"
                                >
                                  {tech}
                                </Badge>
                              </WrapItem>
                            ))}
                          </Wrap>
                        </VStack>
                      )}
                      
                      {/* Visit Website Button */}
                      {selectedProject.url && (
                        <VStack align="start" spacing={2} w="full" pt={3}>
                          <Heading size="xs" color={mutedColor} textTransform="uppercase">
                            Project Link
                          </Heading>
                          
                          <Button
                            as="a"
                            href={selectedProject.url}
                            target="_blank"
                            leftIcon={<FaExternalLinkAlt />}
                            colorScheme="gray"
                            size="md"
                            w="full"
                            className="ultra-modern-button fade-in-up" 
                            style={{ animationDelay: "0.6s" }}
                            _hover={{
                              transform: 'translateY(-4px)',
                              boxShadow: 'lg'
                            }}
                            transition="all 0.3s cubic-bezier(0.23, 1, 0.320, 1)"
                            borderRadius="xl"
                          >
                            <span>Visit Project</span>
                          </Button>
                        </VStack>
                      )}
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfessionalPortfolioPage;
