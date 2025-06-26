'use client';

import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Avatar, 
  Button, 
  Card, 
  CardBody, 
  Badge, 
  Grid, 
  GridItem,
  Flex, 
  SimpleGrid, 
  IconButton,
  useColorMode,
  useColorModeValue,
  Image,
  Link,
  Divider,
  Stack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Wrap,
  WrapItem,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  Icon
} from '@chakra-ui/react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaExternalLinkAlt, 
  FaEnvelope, 
  FaPhone,
  FaSun,
  FaMoon,
  FaCode,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaEye
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProjectModal } from '@/components/ProjectModal-Modern';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  phone?: string;
  field_of_work?: string;
  skills?: string[];
  location?: string;
  website?: string;
  education?: string;
  experience?: string;
  resume_url?: string;
  cv?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  github_url?: string;
  image_url?: string;
  technologies?: string[];
  project_type?: string;
  client?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}

interface PortfolioPageProps {
  params: { username: string };
}

const ModernPortfolioPage = ({ params }: PortfolioPageProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Enforce light theme by default
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, []);

  // Color scheme
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('blue.500', 'blue.400');
  const gradientBg = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching data for username:', params.username);
        const username = params.username;
        
        if (!username) {
          console.error('❌ No username provided');
          setLoading(false);
          return;
        }

        console.log('📡 Making API calls...');
        const [userResponse, projectsResponse] = await Promise.all([
          fetch(`/api/user/public/${username}`),
          fetch(`/api/projects?username=${username}`)
        ]);

        console.log('👤 User response status:', userResponse.status);
        console.log('📁 Projects response status:', projectsResponse.status);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log('✅ User data received:', userData);
          setUser(userData);
        } else {
          console.error('❌ User API error:', await userResponse.text());
        }

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          console.log('✅ Projects data received:', projectsData);
          setProjects(Array.isArray(projectsData) ? projectsData : []);
        } else {
          console.error('❌ Projects API error:', await projectsResponse.text());
        }
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: FaGithub, url: user?.github_url, label: 'GitHub' },
    { icon: FaLinkedin, url: user?.linkedin_url, label: 'LinkedIn' },
    { icon: FaTwitter, url: user?.twitter_url, label: 'Twitter' },
    { icon: FaInstagram, url: user?.instagram_url, label: 'Instagram' },
  ].filter(link => link.url);

  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="lg" color={mutedColor}>Loading portfolio...</Text>
        </VStack>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Heading size="lg" color={textColor}>Portfolio Not Found</Heading>
          <Text color={mutedColor}>The requested portfolio could not be found.</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Fixed Header with Dark Mode Toggle */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={useColorModeValue('rgba(255,255,255,0.95)', 'rgba(26,32,44,0.95)')}
        backdropFilter="blur(10px)"
        borderBottom="1px"
        borderColor={borderColor}
        zIndex={1000}
        py={4}
      >
        <Container maxW="7xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Avatar size="sm" src={user.avatar_url} name={user.name} />
              <Text fontWeight="bold" color={textColor}>{user.name}</Text>
            </HStack>
            
            <HStack spacing={6}>
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Link
                  onClick={() => scrollToSection('about')}
                  color={mutedColor}
                  _hover={{ color: accentColor }}
                  cursor="pointer"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  About
                </Link>
                {projects.length > 0 && (
                  <Link
                    onClick={() => scrollToSection('projects')}
                    color={mutedColor}
                    _hover={{ color: accentColor }}
                    cursor="pointer"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Projects
                  </Link>
                )}
                {user.skills && user.skills.length > 0 && (
                  <Link
                    onClick={() => scrollToSection('skills')}
                    color={mutedColor}
                    _hover={{ color: accentColor }}
                    cursor="pointer"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    Skills
                  </Link>
                )}
                <Link
                  onClick={() => scrollToSection('contact')}
                  color={mutedColor}
                  _hover={{ color: accentColor }}
                  cursor="pointer"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Contact
                </Link>
              </HStack>
              
              <FormControl display="flex" alignItems="center" w="auto">
                <FormLabel htmlFor="dark-mode" mb="0" mr={2}>
                  <IconButton
                    aria-label="Toggle dark mode"
                    icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                    size="sm"
                    variant="ghost"
                    onClick={toggleColorMode}
                  />
                </FormLabel>
              </FormControl>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        pt={24}
        pb={20}
        bgGradient={gradientBg}
        position="relative"
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
          backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')"
        />
        
        <Container maxW="7xl" position="relative">
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12} alignItems="center">
            {/* Main Content */}
            <VStack align={{ base: 'center', lg: 'start' }} spacing={8} textAlign={{ base: 'center', lg: 'left' }}>
              <VStack spacing={4} align={{ base: 'center', lg: 'start' }}>
                <Text
                  fontSize="lg"
                  color={accentColor}
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {user.field_of_work || 'Professional'}
                </Text>
                
                <Heading
                  size="3xl"
                  color={textColor}
                  fontWeight="bold"
                  lineHeight="shorter"
                >
                  {user.name}
                </Heading>
                
                {user.bio && (
                  <Text
                    fontSize="xl"
                    color={mutedColor}
                    maxW="2xl"
                    lineHeight="tall"
                  >
                    {user.bio}
                  </Text>
                )}
                
                {user.location && (
                  <HStack color={mutedColor} fontSize="md">
                    <FaMapMarkerAlt />
                    <Text>{user.location}</Text>
                  </HStack>
                )}
              </VStack>

              {/* Action Buttons */}
              <HStack spacing={4} pt={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={() => scrollToSection('contact')}
                  leftIcon={<FaEnvelope />}
                  borderRadius="full"
                  px={8}
                >
                  Get In Touch
                </Button>
                
                {user.cv && (
                  <Link
                    href={user.cv}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    <Button
                      colorScheme="blue"
                      size="lg"
                      leftIcon={<FaDownload />}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                      transition="all 0.2s"
                    >
                      Download CV
                    </Button>
                  </Link>
                )}
              </HStack>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <HStack spacing={4} mt={4}>
                  {socialLinks.map((social, index) => (
                    <Tooltip key={index} label={social.label}>
                      <IconButton
                        as="a"
                        href={social.url}
                        target="_blank"
                        aria-label={social.label}
                        icon={<social.icon />}
                        variant="ghost"
                        size="lg"
                        color={mutedColor}
                        _hover={{ color: accentColor, transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      />
                    </Tooltip>
                  ))}
                </HStack>
              )}
            </VStack>

            {/* Avatar Section */}
            <Center>
              <Box position="relative">
                <Box
                  position="absolute"
                  top="-20px"
                  left="-20px"
                  right="-20px"
                  bottom="-20px"
                  borderRadius="full"
                  bg={useColorModeValue('blue.100', 'blue.900')}
                  opacity="0.3"
                  transform={`rotate(${scrollY * 0.1}deg)`}
                  transition="transform 0.1s ease"
                />
                <Avatar
                  size="4xl"
                  src={user.avatar_url}
                  name={user.name}
                  border="8px solid"
                  borderColor={cardBg}
                  shadow="2xl"
                />
              </Box>
            </Center>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={20} align="stretch">
          
          {/* About Section */}
          <Box id="about">
            <VStack spacing={8} align="stretch">
              <Heading size="xl" color={textColor} textAlign="center">
                About Me
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {user.experience && (
                  <Card bg={cardBg} p={6} textAlign="center" borderRadius="2xl" shadow="lg">
                    <VStack spacing={3}>
                      <Box p={3} bg={accentColor} color="white" borderRadius="full">
                        <FaBriefcase size={24} />
                      </Box>
                      <Heading size="md" color={textColor}>Experience</Heading>
                      <Text color={mutedColor}>{user.experience}</Text>
                    </VStack>
                  </Card>
                )}
                
                {user.education && (
                  <Card bg={cardBg} p={6} textAlign="center" borderRadius="2xl" shadow="lg">
                    <VStack spacing={3}>
                      <Box p={3} bg={accentColor} color="white" borderRadius="full">
                        <FaGraduationCap size={24} />
                      </Box>
                      <Heading size="md" color={textColor}>Education</Heading>
                      <Text color={mutedColor}>{user.education}</Text>
                    </VStack>
                  </Card>
                )}
                
                <Card bg={cardBg} p={6} textAlign="center" borderRadius="2xl" shadow="lg">
                  <VStack spacing={3}>
                    <Box p={3} bg={accentColor} color="white" borderRadius="full">
                      <FaCode size={24} />
                    </Box>
                    <Heading size="md" color={textColor}>Specialization</Heading>
                    <Text color={mutedColor}>{user.field_of_work || 'Full Stack Development'}</Text>
                  </VStack>
                </Card>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <Box id="skills">
              <VStack spacing={8} align="stretch">
                <Heading size="xl" color={textColor} textAlign="center">
                  Skills & Technologies
                </Heading>
                
                <Card bg={cardBg} p={8} borderRadius="2xl" shadow="lg">
                  <Wrap spacing={4} justify="center">
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
                            shadow: 'md'
                          }}
                          transition="all 0.2s"
                        >
                          {skill}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Card>
              </VStack>
            </Box>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <Box id="projects">
              <VStack spacing={8} align="stretch">
                <Heading size="xl" color={textColor} textAlign="center">
                  Featured Projects
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                  {projects.slice(0, 6).map((project, index) => (
                    <Card
                      key={index}
                      bg={cardBg}
                      borderRadius="2xl"
                      shadow="lg"
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => {
                        setSelectedProject(project);
                        onOpen();
                      }}
                      _hover={{
                        transform: 'translateY(-8px)',
                        shadow: '2xl'
                      }}
                      transition="all 0.3s"
                    >
                      {project.image_url && (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          h="200px"
                          w="full"
                          objectFit="cover"
                        />
                      )}
                      
                      <CardBody p={6}>
                        <VStack align="start" spacing={4}>
                          <Heading size="md" color={textColor} noOfLines={2}>
                            {project.title}
                          </Heading>
                          
                          <Text color={mutedColor} noOfLines={3}>
                            {project.description}
                          </Text>
                          
                          {project.technologies && project.technologies.length > 0 && (
                            <Wrap spacing={2}>
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <WrapItem key={techIndex}>
                                  <Badge
                                    variant="subtle"
                                    colorScheme="gray"
                                    fontSize="xs"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                  >
                                    {tech}
                                  </Badge>
                                </WrapItem>
                              ))}
                              {project.technologies.length > 3 && (
                                <Badge variant="outline" fontSize="xs" px={2} py={1}>
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </Wrap>
                          )}
                          
                          <HStack spacing={3} pt={2}>
                            {project.url && (
                              <IconButton
                                as="a"
                                href={project.url}
                                target="_blank"
                                aria-label="View project"
                                icon={<FaExternalLinkAlt />}
                                size="sm"
                                variant="ghost"
                                color={accentColor}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <IconButton
                              aria-label="View details"
                              icon={<FaEye />}
                              size="sm"
                              variant="ghost"
                              color={accentColor}
                            />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

          {/* Contact Section */}
          <Box id="contact">
            <VStack spacing={8} align="stretch">
              <Heading size="xl" color={textColor} textAlign="center">
                Get In Touch
              </Heading>
              
              <Card bg={cardBg} p={8} borderRadius="2xl" shadow="lg" maxW="2xl" mx="auto">
                <VStack spacing={6}>
                  <Text fontSize="lg" color={mutedColor} textAlign="center">
                    I'm always open to discussing new opportunities and interesting projects.
                  </Text>
                  
                  <VStack spacing={4}>
                    {user.email && (
                      <HStack spacing={4} w="full" justify="center">
                        <FaEnvelope color={accentColor} />
                        <Link href={`mailto:${user.email}`} color={accentColor} fontWeight="medium">
                          {user.email}
                        </Link>
                      </HStack>
                    )}
                    
                    {user.phone && (
                      <HStack spacing={4} w="full" justify="center">
                        <FaPhone color={accentColor} />
                        <Link href={`tel:${user.phone}`} color={accentColor} fontWeight="medium">
                          {user.phone}
                        </Link>
                      </HStack>
                    )}
                  </VStack>
                  
                  <Button
                    size="lg"
                    colorScheme="blue"
                    as="a"
                    href={`mailto:${user.email}`}
                    leftIcon={<FaEnvelope />}
                    borderRadius="full"
                    px={8}
                  >
                    Send Message
                  </Button>
                </VStack>
              </Card>
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.100', 'gray.800')} py={8} mt={20}>
        <Container maxW="7xl">
          <VStack spacing={4}>
            <Text color={mutedColor} textAlign="center">
              © 2025 {user.name}. All rights reserved.
            </Text>
            {socialLinks.length > 0 && (
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    as="a"
                    href={social.url}
                    target="_blank"
                    aria-label={social.label}
                    icon={<social.icon />}
                    variant="ghost"
                    size="sm"
                    color={mutedColor}
                    _hover={{ color: accentColor }}
                  />
                ))}
              </HStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default ModernPortfolioPage;
