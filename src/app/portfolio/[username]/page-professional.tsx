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

  // Professional color scheme
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white, blue.50)',
    'linear(to-br, gray.900, gray.800, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.600', 'blue.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const heroGradient = useColorModeValue(
    'linear(135deg, blue.600, purple.600, pink.500)',
    'linear(135deg, blue.400, purple.400, pink.400)'
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
        py={{ base: 16, md: 24 }}
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          backgroundImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
          backgroundSize="50px 50px"
        />
        
        <Container maxW="7xl" position="relative" zIndex="1">
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12} alignItems="center">
            <VStack align="start" spacing={6} color="white">
              <ScaleFade initialScale={0.8} in={true}>
                <VStack align="start" spacing={4}>
                  <Badge
                    bg="whiteAlpha.200"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    {user.field_of_work || 'Professional'}
                  </Badge>
                  
                  <Heading
                    size={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    fontWeight="800"
                    lineHeight="shorter"
                    letterSpacing="tight"
                  >
                    {user.name}
                  </Heading>
                  
                  <Text
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="500"
                    opacity="0.9"
                  >
                    {user.job_title}
                  </Text>
                  
                  {user.years_of_experience && user.years_of_experience > 0 && (
                    <HStack spacing={2}>
                      <FaBriefcase />
                      <Text fontSize="lg" opacity="0.8">
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
                >
                  {user.bio}
                </Text>
              )}

              {/* Contact & Social Links */}
              <VStack align="start" spacing={4} w="full">
                {/* Contact Info */}
                <HStack spacing={6} flexWrap="wrap">
                  {user.email && (
                    <HStack spacing={2} opacity="0.9">
                      <FaEnvelope size="16" />
                      <Text fontSize="sm">{user.email}</Text>
                    </HStack>
                  )}
                  {user.phone && (
                    <HStack spacing={2} opacity="0.9">
                      <FaPhone size="16" />
                      <Text fontSize="sm">{user.phone}</Text>
                    </HStack>
                  )}
                  {user.location && (
                    <HStack spacing={2} opacity="0.9">
                      <FaMapMarkerAlt size="16" />
                      <Text fontSize="sm">{user.location}</Text>
                    </HStack>
                  )}
                </HStack>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <HStack spacing={4} pt={2}>
                    {socialLinks.map((link, index) => {
                      const Icon = getSocialIcon(link.platform);
                      return (
                        <Tooltip key={index} label={link.label}>
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
                            bg="whiteAlpha.200"
                            _hover={{
                              bg: 'whiteAlpha.300',
                              transform: 'translateY(-2px)',
                            }}
                            transition="all 0.2s"
                          />
                        </Tooltip>
                      );
                    })}
                  </HStack>
                )}

                {/* CTA Buttons */}
                <HStack spacing={4} pt={4}>
                  {user.cv_url && (
                    <Button
                      as="a"
                      href={user.cv_url}
                      target="_blank"
                      leftIcon={<FaDownload />}
                      size="lg"
                      bg="white"
                      color="blue.600"
                      _hover={{
                        bg: 'whiteAlpha.900',
                        transform: 'translateY(-2px)',
                      }}
                      transition="all 0.2s"
                      shadow="xl"
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
                    borderColor="white"
                    color="white"
                    _hover={{
                      bg: 'whiteAlpha.200',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s"
                  >
                    Get In Touch
                  </Button>
                </HStack>
              </VStack>
            </VStack>

            {/* Avatar Section */}
            <Center>
              <Box
                position="relative"
                p={2}
                bg="whiteAlpha.200"
                borderRadius="full"
                backdropFilter="blur(10px)"
              >
                <Avatar
                  size={{ base: '2xl', md: '3xl' }}
                  name={user.name}
                  src={user.avatar_url || ''}
                  border="4px solid"
                  borderColor="white"
                  shadow="2xl"
                />
                {user.field_of_work && (
                  <Badge
                    position="absolute"
                    bottom={4}
                    right={4}
                    bg="white"
                    color="blue.600"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    shadow="lg"
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
      <Container maxW="7xl" py={16}>
        <VStack spacing={16} align="stretch">
          
          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <Box>
              <VStack align="start" spacing={8}>
                <HStack spacing={4}>
                  <Box w={1} h={8} bg={accentColor} borderRadius="full" />
                  <Heading size="xl" color={textColor}>Skills & Expertise</Heading>
                </HStack>
                
                <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="1px" borderColor={borderColor}>
                  <CardBody p={8}>
                    <Wrap spacing={4}>
                      {user.skills.map((skill, index) => (
                        <WrapItem key={index}>
                          <Badge
                            px={4}
                            py={2}
                            bg={useColorModeValue('blue.50', 'blue.900')}
                            color={accentColor}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="medium"
                            border="1px"
                            borderColor={useColorModeValue('blue.200', 'blue.700')}
                            _hover={{
                              transform: 'translateY(-2px)',
                              shadow: 'lg',
                            }}
                            transition="all 0.2s"
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
            <Box>
              <VStack align="start" spacing={8}>
                <HStack spacing={4}>
                  <Box w={1} h={8} bg={accentColor} borderRadius="full" />
                  <Heading size="xl" color={textColor}>Featured Projects</Heading>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
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
                      _hover={{
                        transform: 'translateY(-8px)',
                        shadow: '2xl',
                      }}
                      transition="all 0.3s ease"
                    >
                      {project.image_url && (
                        <Box h="200px" overflow="hidden">
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            w="full"
                            h="full"
                            objectFit="cover"
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="transform 0.3s"
                          />
                        </Box>
                      )}
                      
                      <CardBody p={6}>
                        <VStack align="start" spacing={4}>
                          <HStack justify="space-between" w="full">
                            <Badge
                              colorScheme="blue"
                              variant="subtle"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                            >
                              {project.project_type || 'Project'}
                            </Badge>
                            {project.client && (
                              <Text fontSize="xs" color={mutedColor}>
                                {project.client}
                              </Text>
                            )}
                          </HStack>
                          
                          <VStack align="start" spacing={2}>
                            <Heading size="md" color={textColor} noOfLines={2}>
                              {project.title}
                            </Heading>
                            <Text color={mutedColor} fontSize="sm" noOfLines={3}>
                              {project.description}
                            </Text>
                          </VStack>

                          {project.technologies && project.technologies.length > 0 && (
                            <Wrap spacing={2}>
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <WrapItem key={techIndex}>
                                  <Badge
                                    variant="outline"
                                    colorScheme="gray"
                                    fontSize="2xs"
                                    px={2}
                                    py={1}
                                  >
                                    {tech}
                                  </Badge>
                                </WrapItem>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge variant="outline" colorScheme="gray" fontSize="2xs">
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </Wrap>
                          )}

                          <HStack spacing={4} pt={2}>
                            {project.url && (
                              <Button
                                size="sm"
                                variant="ghost"
                                leftIcon={<FaExternalLinkAlt />}
                                color={accentColor}
                                as="a"
                                href={project.url}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
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

      {/* Project Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent mx={4} bg={cardBg} borderRadius="2xl">
          <ModalHeader pb={2}>
            <ModalCloseButton />
            {selectedProject && (
              <VStack align="start" spacing={2}>
                <Heading size="lg">{selectedProject.title}</Heading>
                <HStack spacing={4}>
                  <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                    {selectedProject.project_type || 'Project'}
                  </Badge>
                  {selectedProject.client && (
                    <Text fontSize="sm" color={mutedColor}>
                      Client: {selectedProject.client}
                    </Text>
                  )}
                </HStack>
              </VStack>
            )}
          </ModalHeader>
          
          <ModalBody pb={6}>
            {selectedProject && (
              <VStack spacing={6} align="stretch">
                {selectedProject.image_url && (
                  <Box borderRadius="xl" overflow="hidden">
                    <Image
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      w="full"
                      h="300px"
                      objectFit="cover"
                    />
                  </Box>
                )}
                
                <Text lineHeight="tall" color={textColor}>
                  {selectedProject.description}
                </Text>

                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <Box>
                    <Text fontWeight="semibold" mb={3} color={textColor}>
                      Technologies Used
                    </Text>
                    <Wrap spacing={3}>
                      {selectedProject.technologies.map((tech, index) => (
                        <WrapItem key={index}>
                          <Badge
                            colorScheme="blue"
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {tech}
                          </Badge>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                )}

                {(selectedProject.start_date || selectedProject.end_date) && (
                  <HStack spacing={4}>
                    <FaCalendar color={mutedColor} />
                    <Text color={mutedColor}>
                      {selectedProject.start_date && new Date(selectedProject.start_date).toLocaleDateString()}
                      {selectedProject.start_date && selectedProject.end_date && ' - '}
                      {selectedProject.end_date && new Date(selectedProject.end_date).toLocaleDateString()}
                    </Text>
                  </HStack>
                )}

                {selectedProject.url && (
                  <Button
                    as="a"
                    href={selectedProject.url}
                    target="_blank"
                    leftIcon={<FaExternalLinkAlt />}
                    colorScheme="blue"
                    size="lg"
                    w="fit-content"
                  >
                    View Live Project
                  </Button>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfessionalPortfolioPage;
