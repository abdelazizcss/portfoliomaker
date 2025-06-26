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
} from '@chakra-ui/react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaDownload,
  FaExternalLinkAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaCode,
  FaToolbox,
  FaLaptopCode,
  FaBriefcase,
  FaUserTie,
  FaPhone,
  FaQuoteLeft,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FaYoutube,
  FaFacebook,
  FaCalendarAlt,
  FaBuilding,
  FaGraduationCap,
  FaAward,
  FaLanguage,
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { userAPI, projectsAPI } from '@/lib/api';
import { DatabaseUser, Project } from '@/types';

export default function PortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const { colorMode, toggleColorMode } = useColorMode();
  
  const [userProfile, setUserProfile] = useState<DatabaseUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [regularProjects, setRegularProjects] = useState<Project[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Professional color scheme
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white, blue.50)',
    'linear(to-br, gray.900, gray.800, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const headerBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        
        const [profileData, projectsData] = await Promise.all([
          userAPI.getProfileByUsername(username),
          projectsAPI.getProjectsByUsername(username)
        ]);
        
        if (!profileData) {
          setNotFound(true);
          return;
        }
        
        setUserProfile(profileData);
        
        const featured = projectsData.filter(p => p.featured).sort((a, b) => ((a.order || a.sort_order || 0) - (b.order || b.sort_order || 0)));
        const regular = projectsData.filter(p => !p.featured).sort((a, b) => ((a.order || a.sort_order || 0) - (b.order || b.sort_order || 0)));
        
        setProjects(projectsData);
        setFeaturedProjects(featured);
        setRegularProjects(regular);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadPortfolioData();
    }
  }, [username]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getExperienceText = (years: number) => {
    if (years === 0) return 'Fresh Graduate';
    if (years <= 2) return `${years} years`;
    if (years <= 5) return `${years} years`;
    if (years <= 10) return `${years} years`;
    return `${years}+ years`;
  };

  if (loading) {
    return (
      <Box minH="100vh" bgGradient={bgGradient}>
        <Container maxW="container.xl" py={20}>
          <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={12} alignItems="start">
            <VStack spacing={6} align="center">
              <SkeletonCircle size="200px" />
              <VStack spacing={3} textAlign="center" w="full">
                <Skeleton height="30px" width="200px" />
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="180px" />
              </VStack>
            </VStack>
            <VStack spacing={6} align="start" w="full">
              <Skeleton height="40px" width="200px" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="4" />
            </VStack>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (notFound || !userProfile) {
    return (
      <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4} textAlign="center">
          <Heading size="lg">Portfolio Not Found</Heading>
          <Text>The portfolio you're looking for doesn't exist.</Text>
          <Button as={Link} href="/" colorScheme="brand">
            Go Home
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Floating Color Mode Toggle */}
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="10"
        borderRadius="full"
        boxShadow="lg"
        onClick={toggleColorMode}
        size="lg"
        colorScheme="brand"
      />

      <Container maxW="container.xl" py={{ base: 8, md: 12 }}>
        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={12} alignItems="start">
          {/* Left Sidebar - Profile */}
          <Box position="sticky" top="20px">
            <Card bg={cardBg} shadow="xl" borderRadius="2xl" overflow="hidden">
              <CardBody p={0}>
                {/* Profile Header */}
                <Box p={8} textAlign="center">
                  <Avatar
                    size="2xl"
                    src={userProfile.avatar_url}
                    name={userProfile.name}
                    mb={4}
                    border="4px solid"
                    borderColor={accentColor}
                    getInitials={() => getInitials(userProfile.name)}
                  />
                  <Heading size="lg" mb={2}>{userProfile.name}</Heading>
                  <Text fontSize="md" color={textSecondary} mb={1}>
                    {userProfile.job_title || 'Professional'}
                  </Text>
                  {userProfile.field_of_work && (
                    <Badge colorScheme="blue" fontSize="xs" px={3} py={1} borderRadius="full">
                      {userProfile.field_of_work}
                    </Badge>
                  )}
                  {userProfile.years_of_experience && userProfile.years_of_experience > 0 && (
                    <Text fontSize="sm" color={textSecondary} mt={2}>
                      {getExperienceText(userProfile.years_of_experience)} experience
                    </Text>
                  )}
                  {userProfile.location && (
                    <HStack spacing={1} justify="center" color={textSecondary} mt={2}>
                      <FaMapMarkerAlt size={12} />
                      <Text fontSize="sm">{userProfile.location}</Text>
                    </HStack>
                  )}
                </Box>

                <Divider />

                {/* Contact Info */}
                <Box p={6}>
                  <Heading size="sm" mb={4}>Contact</Heading>
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={3}>
                      <Box color={accentColor}>
                        <FaEnvelope />
                      </Box>
                      <ChakraLink href={`mailto:${userProfile.email}`} fontSize="sm" _hover={{ color: accentColor }}>
                        {userProfile.email}
                      </ChakraLink>
                    </HStack>
                    {userProfile.phone && (
                      <HStack spacing={3}>
                        <Box color={accentColor}>
                          <FaPhone />
                        </Box>
                        <ChakraLink href={`tel:${userProfile.phone}`} fontSize="sm" _hover={{ color: accentColor }}>
                          {userProfile.phone}
                        </ChakraLink>
                      </HStack>
                    )}
                    {userProfile.website && (
                      <HStack spacing={3}>
                        <Box color={accentColor}>
                          <FaGlobe />
                        </Box>
                        <ChakraLink href={userProfile.website} fontSize="sm" isExternal _hover={{ color: accentColor }}>
                          Website
                        </ChakraLink>
                      </HStack>
                    )}
                  </VStack>
                </Box>

                <Divider />

                {/* Social Links */}
                <Box p={6}>
                  <Heading size="sm" mb={4}>Connect</Heading>
                  <Wrap justify="center" spacing={2}>
                    {userProfile.github_username && (
                      <Tooltip label="GitHub">
                        <IconButton
                          aria-label="GitHub"
                          icon={<FaGithub />}
                          as={ChakraLink}
                          href={`https://github.com/${userProfile.github_username}`}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'gray.100', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.linkedin && (
                      <Tooltip label="LinkedIn">
                        <IconButton
                          aria-label="LinkedIn"
                          icon={<FaLinkedin />}
                          as={ChakraLink}
                          href={userProfile.linkedin}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'blue.50', color: 'blue.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.twitter && (
                      <Tooltip label="Twitter">
                        <IconButton
                          aria-label="Twitter"
                          icon={<FaTwitter />}
                          as={ChakraLink}
                          href={userProfile.twitter}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'blue.50', color: 'blue.400', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.instagram && (
                      <Tooltip label="Instagram">
                        <IconButton
                          aria-label="Instagram"
                          icon={<FaInstagram />}
                          as={ChakraLink}
                          href={userProfile.instagram}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'pink.50', color: 'pink.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.behance && (
                      <Tooltip label="Behance">
                        <IconButton
                          aria-label="Behance"
                          icon={<FaBehance />}
                          as={ChakraLink}
                          href={userProfile.behance}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'blue.50', color: 'blue.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.dribbble && (
                      <Tooltip label="Dribbble">
                        <IconButton
                          aria-label="Dribbble"
                          icon={<FaDribbble />}
                          as={ChakraLink}
                          href={userProfile.dribbble}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'pink.50', color: 'pink.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.youtube && (
                      <Tooltip label="YouTube">
                        <IconButton
                          aria-label="YouTube"
                          icon={<FaYoutube />}
                          as={ChakraLink}
                          href={userProfile.youtube}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'red.50', color: 'red.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                    {userProfile.facebook && (
                      <Tooltip label="Facebook">
                        <IconButton
                          aria-label="Facebook"
                          icon={<FaFacebook />}
                          as={ChakraLink}
                          href={userProfile.facebook}
                          target="_blank"
                          size="sm"
                          variant="ghost"
                          _hover={{ bg: 'blue.50', color: 'blue.600', transform: 'scale(1.1)' }}
                        />
                      </Tooltip>
                    )}
                  </Wrap>
                </Box>

                {/* Download CV */}
                {userProfile.cv_url && (
                  <>
                    <Divider />
                    <Box p={6}>
                      <Button
                        leftIcon={<FaDownload />}
                        colorScheme="brand"
                        size="sm"
                        w="full"
                        as={ChakraLink}
                        href={userProfile.cv_url}
                        target="_blank"
                      >
                        Download Resume
                      </Button>
                    </Box>
                  </>
                )}
              </CardBody>
            </Card>
          </Box>

          {/* Right Content */}
          <VStack spacing={8} align="stretch">
            {/* About Section */}
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="start" spacing={4}>
                  <Heading size="lg" display="flex" alignItems="center" gap={3}>
                    <Box color={accentColor}>
                      <FaUserTie />
                    </Box>
                    About Me
                  </Heading>
                  <Text fontSize="lg" lineHeight="tall" color={textSecondary}>
                    {userProfile.bio || 
                     `Hello! I'm ${userProfile.name}, a passionate ${userProfile.field_of_work || 'professional'} with ${userProfile.years_of_experience ? getExperienceText(userProfile.years_of_experience) : ''} of experience. Welcome to my portfolio where you can explore my work and achievements.`}
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            {/* Skills Section */}
            {userProfile.skills && userProfile.skills.length > 0 && (
              <Card bg={cardBg} shadow="lg" borderRadius="xl">
                <CardBody p={8}>
                  <VStack align="start" spacing={6}>
                    <Heading size="lg" display="flex" alignItems="center" gap={3}>
                      <Box color={accentColor}>
                        <FaToolbox />
                      </Box>
                      Skills & Expertise
                    </Heading>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3} w="full">
                      {userProfile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          colorScheme="blue"
                          variant="subtle"
                          px={3}
                          py={2}
                          borderRadius="md"
                          fontSize="sm"
                          textAlign="center"
                          _hover={{ transform: 'scale(1.05)' }}
                          transition="all 0.2s ease"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Projects Section */}
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="start" spacing={6}>
                  <Heading size="lg" display="flex" alignItems="center" gap={3}>
                    <Box color={accentColor}>
                      <FaLaptopCode />
                    </Box>
                    My Projects
                  </Heading>
                  
                  {/* Featured Projects */}
                  {featuredProjects.length > 0 && (
                    <Box w="full">
                      <Text fontWeight="bold" mb={4} color={accentColor}>Featured Work</Text>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                        {featuredProjects.map((project) => (
                          <Card
                            key={project.id}
                            overflow="hidden"
                            variant="outline"
                            _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                            transition="all 0.3s ease"
                            cursor="pointer"
                            onClick={() => handleViewProject(project)}
                          >
                            {project.image_url && (
                              <Box h="180px" overflow="hidden">
                                <Image
                                  objectFit="cover"
                                  w="100%"
                                  h="100%"
                                  src={project.image_url}
                                  alt={project.title}
                                />
                              </Box>
                            )}
                            <CardBody>
                              <VStack align="start" spacing={3}>
                                <HStack justify="space-between" w="full">
                                  <Heading size="md">{project.title}</Heading>
                                  {project.project_type && (
                                    <Badge 
                                      colorScheme={
                                        project.project_type === 'professional' ? 'blue' :
                                        project.project_type === 'academic' ? 'green' :
                                        project.project_type === 'volunteer' ? 'purple' : 'gray'
                                      }
                                      size="sm"
                                    >
                                      {project.project_type}
                                    </Badge>
                                  )}
                                </HStack>
                                
                                {project.client && (
                                  <HStack spacing={1}>
                                    <FaBuilding size={12} />
                                    <Text fontSize="sm" color={textSecondary}>{project.client}</Text>
                                  </HStack>
                                )}
                                
                                <Text color={textSecondary} noOfLines={2}>
                                  {project.description}
                                </Text>
                                
                                <Wrap>
                                  {project.technologies.slice(0, 3).map((tech) => (
                                    <Badge key={tech} colorScheme="gray" size="sm">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <Badge colorScheme="gray" size="sm">
                                      +{project.technologies.length - 3}
                                    </Badge>
                                  )}
                                </Wrap>
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Regular Projects */}
                  {regularProjects.length > 0 && (
                    <Box w="full">
                      {featuredProjects.length > 0 && <Text fontWeight="bold" mb={4} color={accentColor}>Other Projects</Text>}
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {regularProjects.map((project) => (
                          <Card 
                            key={project.id} 
                            overflow="hidden" 
                            variant="outline"
                            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} 
                            transition="all 0.3s ease"
                            cursor="pointer"
                            onClick={() => handleViewProject(project)}
                          >
                            {project.image_url ? (
                              <Box h="140px" overflow="hidden">
                                <Image
                                  objectFit="cover"
                                  w="100%"
                                  h="100%"
                                  src={project.image_url}
                                  alt={project.title}
                                />
                              </Box>
                            ) : (
                              <Box
                                h="140px"
                                bg={useColorModeValue('gray.100', 'gray.700')}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <FaCode size={40} color={useColorModeValue('gray.400', 'gray.500')} />
                              </Box>
                            )}
                            
                            <CardBody>
                              <VStack spacing={3} align="start">
                                <Heading size="sm">{project.title}</Heading>
                                <Text color={textSecondary} fontSize="sm" noOfLines={2}>
                                  {project.description}
                                </Text>
                                <Wrap>
                                  {project.technologies.slice(0, 2).map((tech) => (
                                    <Badge key={tech} colorScheme="gray" size="sm">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies.length > 2 && (
                                    <Badge colorScheme="gray" size="sm">
                                      +{project.technologies.length - 2}
                                    </Badge>
                                  )}
                                </Wrap>
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  
                  {projects.length === 0 && (
                    <Box textAlign="center" py={10} w="full">
                      <Text color={textSecondary}>
                        No projects added yet.
                      </Text>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Container>

      {/* Project Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg={cardBg} borderRadius="xl">
          <ModalHeader fontSize="2xl">{selectedProject?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedProject && (
              <VStack spacing={6} align="stretch">
                {selectedProject.image_url && (
                  <Box borderRadius="lg" overflow="hidden" h="300px">
                    <Image
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      objectFit="cover"
                      w="full"
                      h="full"
                    />
                  </Box>
                )}
                
                <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" mb={2}>About This Project</Text>
                      <Text>{selectedProject.description}</Text>
                    </Box>
                    
                    {(selectedProject.start_date || selectedProject.end_date) && (
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>Timeline</Text>
                        <HStack spacing={2}>
                          <FaCalendarAlt />
                          <Text>
                            {selectedProject.start_date ? new Date(selectedProject.start_date).toLocaleDateString() : ''} 
                            {selectedProject.start_date && selectedProject.end_date ? ' - ' : ''}
                            {selectedProject.end_date ? new Date(selectedProject.end_date).toLocaleDateString() : ''}
                            {selectedProject.start_date && !selectedProject.end_date ? ' - Present' : ''}
                          </Text>
                        </HStack>
                      </Box>
                    )}
                    
                    {selectedProject.client && (
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>Client</Text>
                        <HStack spacing={2}>
                          <FaBuilding />
                          <Text>{selectedProject.client}</Text>
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                  
                  <VStack align="start" spacing={4}>
                    {selectedProject.project_type && (
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>Type</Text>
                        <Badge 
                          colorScheme={
                            selectedProject.project_type === 'professional' ? 'blue' :
                            selectedProject.project_type === 'academic' ? 'green' :
                            selectedProject.project_type === 'volunteer' ? 'purple' : 'gray'
                          }
                          px={3}
                          py={1}
                          borderRadius="md"
                        >
                          {selectedProject.project_type}
                        </Badge>
                      </Box>
                    )}
                    
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" mb={2}>Technologies</Text>
                      <Wrap>
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge key={index} colorScheme="blue" variant="subtle" px={2} py={1}>
                            {tech}
                          </Badge>
                        ))}
                      </Wrap>
                    </Box>
                  </VStack>
                </Grid>
                
                <HStack justify="center" spacing={4} pt={4}>
                  {selectedProject.url && (
                    <Button
                      leftIcon={<FaExternalLinkAlt />}
                      as={ChakraLink}
                      href={selectedProject.url}
                      target="_blank"
                      variant="outline"
                      colorScheme="brand"
                    >
                      View Project
                    </Button>
                  )}
                  {selectedProject.demo_link && (
                    <Button
                      leftIcon={<FaGlobe />}
                      as={ChakraLink}
                      href={selectedProject.demo_link}
                      target="_blank"
                      colorScheme="brand"
                    >
                      Live Demo
                    </Button>
                  )}
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={8} mt={12}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Text color={textSecondary}>
              © 2024 {userProfile.name}. Built with Portfolio Maker.
            </Text>
            <Text fontSize="sm" color={textSecondary}>
              Professional portfolio crafted to showcase skills and achievements across all industries.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
