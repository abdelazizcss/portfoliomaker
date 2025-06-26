'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Badge,
  useColorModeValue,
  IconButton,
  useDisclosure,
  useToast,
  Spinner,
  Progress,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {
  FaEdit,
  FaEye,
  FaPlus,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaUser,
  FaInfo,
  FaExternalLinkAlt,
  FaTrash,
  FaRocket,
} from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import ProfileEditModal from '@/components/ProfileEditModal';
import ProjectModal from '@/components/ProjectModal';
import DeployModal from '@/components/DeployModal';
import { userAPI, projectsAPI } from '@/lib/api';
import { DatabaseUser, Project } from '@/types';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const toast = useToast();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<DatabaseUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const { isOpen: isProfileModalOpen, onOpen: onProfileModalOpen, onClose: onProfileModalClose } = useDisclosure();
  const { isOpen: isProjectOpen, onOpen: onProjectOpen, onClose: onProjectClose } = useDisclosure();
  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();
  const { isOpen: isDeployModalOpen, onOpen: onDeployModalOpen, onClose: onDeployModalClose } = useDisclosure();
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const cancelDeleteRef = useRef(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const loadData = async () => {
      if (!session?.user) return;
      
      try {
        setIsLoading(true);
        
        // Load user profile and projects in parallel
        const [profileData, projectsData] = await Promise.all([
          userAPI.getProfile(),
          projectsAPI.getProjects()
        ]);
        
        // If no profile exists, create one with basic GitHub data
        if (!profileData) {
          const newProfile: Partial<DatabaseUser> = {
            name: session.user.name || 'User',
            email: session.user.email || '',
            bio: '',
            avatar_url: session.user.image || '',
            github_username: session.user.github_username || session.user.name || 'user',
            location: '',
            website: '',
            linkedin: '',
            twitter: '',
            skills: [],
            job_title: '',
            phone: '',
          };
          
          const savedProfile = await userAPI.saveProfile(newProfile as DatabaseUser);
          setUserProfile(savedProfile);
        } else {
          setUserProfile(profileData);
        }
        
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error loading data",
          description: "Please refresh the page",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadData();
    }
  }, [session, status, toast, router]);

  useEffect(() => {
    // Calculate profile completion percentage
    if (userProfile) {
      setProfileCompletion(calculateProfileCompletion(userProfile));
    }
  }, [userProfile]);

  // Calculate how complete the profile is
  const calculateProfileCompletion = (profile: DatabaseUser): number => {
    const fields = [
      'name', 'email', 'bio', 'avatar_url', 'github_username',
      'location', 'website', 'linkedin', 'job_title'
    ];
    
    const completedFields = fields.filter(field => 
      profile[field as keyof DatabaseUser] && 
      String(profile[field as keyof DatabaseUser]).trim() !== ''
    );

    // Extra points if they have skills and profile image
    let extraPoints = 0;
    if (profile.skills && profile.skills.length > 0) extraPoints += 10;
    if (profile.avatar_url) extraPoints += 10;
    if (profile.cv_url) extraPoints += 10;
    
    const basePercentage = (completedFields.length / fields.length) * 70;
    return Math.min(100, Math.round(basePercentage + extraPoints));
  };

  const handleProfileSave = async (updatedProfile: Partial<DatabaseUser>) => {
    try {
      const savedProfile = await userAPI.saveProfile(updatedProfile);
      setUserProfile(savedProfile);
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProjectSave = async (projectData: Project) => {
    try {
      if (editingProject) {
        // Update existing project
        const updatedProject = await projectsAPI.updateProject({ ...projectData, id: editingProject.id });
        setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
        toast({
          title: "Project updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new project
        const newProject = await projectsAPI.createProject(projectData);
        setProjects(prev => [...prev, newProject]);
        toast({
          title: "Project added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setEditingProject(null);
    } catch (error) {
      toast({
        title: editingProject ? "Error updating project" : "Error adding project",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    onProjectOpen();
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    onProjectOpen();
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    onDeleteAlertOpen();
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      await projectsAPI.deleteProject(projectToDelete.id);
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      toast({
        title: "Project deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting project",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onDeleteAlertClose();
      setProjectToDelete(null);
    }
  };

  if (!isMounted || status === 'loading' || isLoading) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading Dashboard...</Text>
        </VStack>
      </Box>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      {/* Header */}
      <Box bg={cardBg} borderBottom="1px" borderColor={borderColor} py={4} boxShadow="sm">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading size="md" color="blue.600">Portfolio Dashboard</Heading>
            <HStack spacing={4}>
              <Button
                as="a"
                href="/"
                leftIcon={<FaGlobe />}
                size="sm"
                colorScheme="gray"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/');
                }}
              >
                Home
              </Button>
              <Button
                as="a"
                href={`/portfolio/${userProfile?.github_username || 'demo'}`}
                leftIcon={<FaEye />}
                size="sm"
                colorScheme="blue"
                variant="outline"
                target="_blank"
              >
                View Portfolio
              </Button>
              <Button
                leftIcon={<FaUser />}
                size="sm"
                variant="ghost"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* Progress Summary */}
        {userProfile && profileCompletion < 100 && (
          <Card mb={6} bg={cardBg} borderColor={borderColor} borderWidth="1px" boxShadow="sm">
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={4}>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="medium">Profile Completion: {profileCompletion}%</Text>
                  <Box w="full" maxW="300px">
                    <Progress value={profileCompletion} size="sm" colorScheme="blue" borderRadius="full" />
                  </Box>
                </VStack>
                <Button size="sm" colorScheme="blue" onClick={onProfileModalOpen}>
                  Complete Profile
                </Button>
              </Flex>
            </CardBody>
          </Card>
        )}

        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={6}>
          {/* Left Column - Profile Info */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Profile Card */}
              <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" boxShadow="sm">
                <CardHeader pb={0}>
                  <Flex justify="space-between" align="center">
                    <Heading size="sm">Profile</Heading>
                    <IconButton
                      aria-label="Edit Profile"
                      icon={<FaEdit />}
                      size="sm"
                      variant="ghost"
                      onClick={onProfileModalOpen}
                    />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="center">
                    <Avatar
                      size="xl"
                      src={userProfile?.avatar_url}
                      name={userProfile?.name}
                    />
                    <VStack spacing={1} textAlign="center">
                      <Heading size="md">{userProfile?.name}</Heading>
                      <Text color={mutedTextColor} fontSize="sm">
                        {userProfile?.job_title || 'Add your job title'}
                      </Text>
                      {userProfile?.bio ? (
                        <Text fontSize="sm" textAlign="center" mt={2}>
                          {userProfile.bio}
                        </Text>
                      ) : (
                        <Text fontSize="sm" color={mutedTextColor} textAlign="center" mt={2}>
                          Add a bio to tell visitors about yourself
                        </Text>
                      )}
                    </VStack>
                  </VStack>
                  
                  <Divider my={4} />
                  
                  {/* Social Links */}
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">Social Links</Text>
                    {userProfile?.github_username && (
                      <HStack spacing={3}>
                        <FaGithub size="14px" />
                        <Text fontSize="sm">github.com/{userProfile.github_username}</Text>
                      </HStack>
                    )}
                    {userProfile?.deployed_site_url && (
                      <HStack spacing={3}>
                        <FaRocket size="14px" />
                        <a 
                          href={userProfile.deployed_site_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: 'var(--chakra-colors-blue-500)', fontSize: 'var(--chakra-fontSizes-sm)' }}
                        >
                          {userProfile.deployed_site_url.replace(/^https?:\/\//, '')}
                          <Box as="span" ml={1} display="inline-flex" alignItems="center">
                            <FaExternalLinkAlt size="10px" />
                          </Box>
                        </a>
                      </HStack>
                    )}
                    {userProfile?.linkedin && (
                      <HStack spacing={3}>
                        <FaLinkedin size="14px" />
                        <Text fontSize="sm">{userProfile.linkedin}</Text>
                      </HStack>
                    )}
                    {userProfile?.twitter && (
                      <HStack spacing={3}>
                        <FaTwitter size="14px" />
                        <Text fontSize="sm">{userProfile.twitter}</Text>
                      </HStack>
                    )}
                    {userProfile?.website && (
                      <HStack spacing={3}>
                        <FaGlobe size="14px" />
                        <Text fontSize="sm">{userProfile.website}</Text>
                      </HStack>
                    )}
                    
                    {!userProfile?.github_username && 
                     !userProfile?.linkedin && 
                     !userProfile?.twitter && 
                     !userProfile?.website && (
                      <Text fontSize="sm" color={mutedTextColor}>
                        No social links added yet
                      </Text>
                    )}
                  </VStack>
                  
                  <VStack mt={6} spacing={2}>
                    <Button w="full" leftIcon={<FaEdit />} size="sm" colorScheme="blue" onClick={onProfileModalOpen}>
                      Edit Profile
                    </Button>
                    <Button 
                      w="full" 
                      leftIcon={<FaEye />}
                      size="sm" 
                      as="a" 
                      href={`/portfolio/${userProfile?.github_username || 'demo'}`}
                      target="_blank"
                      variant="outline"
                    >
                      View Portfolio
                    </Button>
                    
                    {userProfile?.deployed_site_url ? (
                      <HStack w="full">
                        <Button 
                          flex="1"
                          leftIcon={<FaExternalLinkAlt />}
                          size="sm" 
                          as="a"
                          href={userProfile.deployed_site_url}
                          target="_blank"
                          colorScheme="green"
                          variant="outline"
                        >
                          Live Site
                        </Button>
                        <Button 
                          flex="1"
                          leftIcon={<FaRocket />}
                          size="sm" 
                          colorScheme="green"
                          onClick={onDeployModalOpen}
                        >
                          Redeploy
                        </Button>
                      </HStack>
                    ) : (
                      <Button 
                        w="full" 
                        leftIcon={<FaRocket />}
                        size="sm" 
                        colorScheme="green"
                        onClick={onDeployModalOpen}
                      >
                        Deploy to GitHub
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          {/* Right Column - Projects & Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Deployment Status - Show only if site is deployed */}
              {userProfile?.deployed_site_url && (
                <Card bg={cardBg} borderColor="green.200" borderWidth="1px" boxShadow="sm">
                  <CardHeader pb={2} bg="green.50" _dark={{ bg: "green.900" }}>
                    <Flex align="center">
                      <FaRocket style={{ marginRight: '8px' }} />
                      <Heading size="sm">موقعك المنشور</Heading>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="sm" fontWeight="medium">الحالة:</Text>
                        <Badge colorScheme="green">تم النشر</Badge>
                      </HStack>
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={1}>رابط الموقع:</Text>
                        <a 
                          href={userProfile.deployed_site_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            color: 'var(--chakra-colors-blue-500)', 
                            fontSize: 'var(--chakra-fontSizes-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--chakra-colors-gray-200)',
                            borderRadius: 'var(--chakra-radii-md)',
                            padding: '8px'
                          }}
                        >
                          {userProfile.deployed_site_url.replace(/^https?:\/\//, '')}
                          <Box as={FaExternalLinkAlt} ml={2} fontSize="12px" />
                        </a>
                      </Box>
                      <HStack spacing={2} mt={2}>
                        <Button 
                          size="sm" 
                          leftIcon={<FaEye />} 
                          as="a" 
                          href={userProfile.deployed_site_url}
                          target="_blank"
                          flex="1"
                          colorScheme="blue"
                          variant="outline"
                        >
                          فتح الموقع
                        </Button>
                        <Button 
                          size="sm" 
                          leftIcon={<FaRocket />}
                          colorScheme="green"
                          onClick={onDeployModalOpen}
                          flex="1"
                        >
                          تحديث النشر
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              )}

              {/* Projects Section */}
              <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" boxShadow="sm">
                <CardHeader borderBottomWidth="1px" borderColor={borderColor} pb={4}>
                  <Flex justify="space-between" align="center">
                    <Heading size="sm">Your Projects ({projects.length})</Heading>
                    <Button 
                      leftIcon={<FaPlus />} 
                      size="sm" 
                      colorScheme="blue" 
                      onClick={handleAddProject}
                    >
                      Add Project
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody pt={4}>
                  <VStack spacing={4} align="stretch">
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <Card 
                          key={project.id}
                          variant="outline"
                          boxShadow="none"
                          borderColor={borderColor}
                          transition="all 0.2s"
                          _hover={{ borderColor: "blue.300", shadow: "sm" }}
                        >
                          <CardBody>
                            <Flex direction={{ base: "column", sm: "row" }} justify="space-between">
                              <VStack align="start" spacing={2} flex="1">
                                <Heading size="sm">{project.title}</Heading>
                                <Text fontSize="sm" color={mutedTextColor} noOfLines={2}>
                                  {project.description}
                                </Text>
                                <HStack spacing={2} flexWrap="wrap" mt={1}>
                                  {project.technologies?.slice(0, 3).map((tech) => (
                                    <Badge key={tech} size="sm" colorScheme="blue" variant="subtle">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies?.length > 3 && (
                                    <Badge size="sm" colorScheme="gray" variant="subtle">
                                      +{project.technologies.length - 3} more
                                    </Badge>
                                  )}
                                </HStack>
                              </VStack>
                              
                              <HStack spacing={1} mt={{ base: 3, sm: 0 }}>
                                <IconButton
                                  aria-label="Edit project"
                                  icon={<FaEdit />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditProject(project)}
                                />
                                {project.url && (
                                  <IconButton
                                    aria-label="View Project"
                                    icon={<FaExternalLinkAlt />}
                                    size="sm"
                                    variant="ghost"
                                    as="a"
                                    href={project.url}
                                    target="_blank"
                                  />
                                )}
                                <IconButton
                                  aria-label="Delete project"
                                  icon={<FaTrash />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={() => handleDeleteProject(project)}
                                />
                              </HStack>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))
                    ) : (
                      <Box textAlign="center" py={8}>
                        <Text color={mutedTextColor} mb={4}>
                          No projects yet. Add your first project to get started!
                        </Text>
                        <Button leftIcon={<FaPlus />} colorScheme="blue" size="sm" onClick={handleAddProject}>
                          Add Your First Project
                        </Button>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>

              {/* Quick Tips */}
              <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" boxShadow="sm">
                <CardHeader pb={2}>
                  <Heading size="sm">Tips to Improve Your Portfolio</Heading>
                </CardHeader>
                <CardBody>
                  <List spacing={3}>
                    <ListItem>
                      <HStack align="start" spacing={3}>
                        <ListIcon as={FaInfo} color="blue.500" mt={1} />
                        <Text fontSize="sm">
                          Add a professional photo and detailed bio to make a strong impression
                        </Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack align="start" spacing={3}>
                        <ListIcon as={FaInfo} color="blue.500" mt={1} />
                        <Text fontSize="sm">
                          Include screenshots or preview images in your projects
                        </Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack align="start" spacing={3}>
                        <ListIcon as={FaInfo} color="blue.500" mt={1} />
                        <Text fontSize="sm">
                          Regularly update your portfolio with your latest work and skills
                        </Text>
                      </HStack>
                    </ListItem>
                  </List>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={onProfileModalClose}
        userProfile={userProfile}
        onSave={handleProfileSave}
      />

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectOpen}
        onClose={onProjectClose}
        project={editingProject}
        onSave={handleProjectSave}
      />

      {/* Deploy Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={onDeployModalClose}
        userName={userProfile?.github_username || ''}
      />

      {/* Delete Project Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelDeleteRef}
        onClose={onDeleteAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this project? This action cannot be undone.
              {projectToDelete && (
                <Text fontWeight="bold" mt={2}>
                  "{projectToDelete.title}"
                </Text>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelDeleteRef} onClick={onDeleteAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteProject} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
