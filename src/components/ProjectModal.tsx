'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  IconButton,
  Grid,
  GridItem,
  Box,
  Text,
  useToast,
  Select,
  Image,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  FormHelperText,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  Divider,
  Tooltip,
  Switch,
  Collapse,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FaProjectDiagram,
  FaExternalLinkAlt,
  FaPlus,
  FaUpload,
  FaTimes,
  FaCode,
  FaCheckCircle,
  FaImages,
  FaInfoCircle,
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { Project } from '@/types';
import { useSession } from 'next-auth/react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (project: Project) => void;
  isEdit?: boolean;
}

const projectCategories = [
  // Technology & IT
  'Web Development',
  'Mobile App',
  'Desktop Application',
  'API/Backend',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Cybersecurity',
  'Software Engineering',
  
  // Design & Creative
  'UI/UX Design',
  'Graphic Design',
  'Brand Identity',
  'Product Design',
  'Web Design',
  'Print Design',
  'Illustration',
  'Animation',
  'Photography',
  'Video Production',
  
  // Marketing & Business
  'Digital Marketing',
  'Content Marketing',
  'Social Media Campaign',
  'SEO Project',
  'Brand Strategy',
  'Market Research',
  'Business Analysis',
  'Consulting Project',
  
  // Academic & Research
  'Research Project',
  'Academic Study',
  'Thesis Project',
  'Case Study',
  'Publication',
  'Conference Paper',
  
  // Other Fields
  'Architecture Project',
  'Engineering Project',
  'Healthcare Project',
  'Education Project',
  'Non-profit Initiative',
  'Personal Project',
  'Freelance Work',
  'Volunteer Work',
  'Other',
];

const commonTools = [
  // Programming & Development
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte',
  'Node.js', 'Express', 'FastAPI', 'Django', 'Flask',
  'TypeScript', 'JavaScript', 'Python', 'Java', 'C#',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
  'AWS', 'Docker', 'Kubernetes', 'Vercel', 'Netlify',
  'Tailwind CSS', 'Chakra UI', 'Material-UI', 'Bootstrap',
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  
  // Design Tools
  'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign',
  'Adobe After Effects', 'Adobe Premiere Pro', 'Adobe XD',
  'Figma', 'Sketch', 'InVision', 'Principle', 'Framer',
  'Canva', 'Procreate', 'Blender', 'Cinema 4D',
  
  // Marketing & Analytics
  'Google Analytics', 'Google Ads', 'Facebook Ads',
  'HubSpot', 'Mailchimp', 'Hootsuite', 'Buffer',
  'Salesforce', 'Marketo', 'SEMrush', 'Ahrefs',
  
  // Business & Productivity
  'Microsoft Office', 'Google Workspace', 'Notion',
  'Slack', 'Trello', 'Asana', 'Jira', 'Confluence',
  'Tableau', 'Power BI', 'Excel', 'PowerPoint',
  
  // Other Professional Tools
  'AutoCAD', 'SolidWorks', 'MATLAB', 'R', 'SPSS',
  'Final Cut Pro', 'Logic Pro', 'Pro Tools',
];

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
  isEdit = false,
}: ProjectModalProps) {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardBg = useColorModeValue('white', 'gray.800');
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    url: '',
    demo_link: '',
    technologies: [],
    image_url: '',
    status: 'completed',
    category: 'Web Development',
    featured: false,
    order: 0,
    project_type: 'professional',
    start_date: '',
    end_date: '',
    client: '',
  });
  
  const [currentTech, setCurrentTech] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  useEffect(() => {
    if (project && isEdit) {
      setFormData(project);
      setImagePreview(project.image_url || '');
    } else {
      // Reset form for new project
      setFormData({
        title: '',
        description: '',
        url: '',
        demo_link: '',
        technologies: [],
        image_url: '',
        status: 'completed',
        category: 'Web Development',
        featured: false,
        order: 0,
        project_type: 'professional',
        start_date: '',
        end_date: '',
        client: '',
      });
      setImagePreview('');
      setCurrentTech('');
    }
  }, [project, isEdit, isOpen]);

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTechnology = (tech?: string) => {
    const techToAdd = tech || currentTech.trim();
    if (techToAdd && !(formData.technologies || []).includes(techToAdd)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techToAdd],
      }));
      if (!tech) {
        setCurrentTech('');
      }
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter(tech => tech !== techToRemove),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Image must be smaller than 10MB',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in title and description',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate ID for new projects
      const projectToSave: Project = {
        id: formData.id || `project-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        url: formData.url || '',
        demo_link: formData.demo_link || '',
        technologies: formData.technologies || [],
        image_url: formData.image_url || '',
        status: formData.status || 'completed',
        category: formData.category || 'Web Development',
        project_type: formData.project_type || 'professional',
        start_date: formData.start_date,
        end_date: formData.end_date,
        client: formData.client,
        featured: formData.featured || false,
        order: formData.order || 0,
      };

      // TODO: Save to Supabase here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(projectToSave);
      toast({
        title: isEdit ? 'Project updated successfully!' : 'Project added successfully!',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error saving project',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'planned': return 'orange';
      default: return 'gray';
    }
  };

  const handleGenerateImage = async () => {
    // This is a placeholder for an AI image generation feature
    // In a real implementation, this would call an API to generate an image based on project description
    toast({
      title: "Generating project image...",
      description: "This feature is coming soon!",
      status: "info",
      duration: 3000,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed" index={activeTab} onChange={setActiveTab} colorScheme="brand">
            <TabList mb="1em">
              <Tab>
                <HStack>
                  <FaProjectDiagram />
                  <Text>Details</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaImages />
                  <Text>Media</Text>
                </HStack>
              </Tab>
            </TabList>
            
            <TabPanels>
              {/* Details Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  {/* Basic Information */}
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl isRequired>
                        <FormLabel>Project Title</FormLabel>
                        <InputGroup>
                          <InputLeftElement>
                            <FaProjectDiagram color="gray" />
                          </InputLeftElement>
                          <Input
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Enter project title..."
                          />
                        </InputGroup>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Category</FormLabel>
                        <Select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                        >
                          {projectCategories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value as Project['status'])}
                        >
                          <option value="completed">Completed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="planned">Planned</option>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          value={formData.project_type || 'professional'}
                          onChange={(e) => handleInputChange('project_type', e.target.value)}
                        >
                          <option value="professional">Professional</option>
                          <option value="personal">Personal</option>
                          <option value="academic">Academic</option>
                          <option value="volunteer">Volunteer</option>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input
                          type="date"
                          value={formData.start_date}
                          onChange={(e) => handleInputChange('start_date', e.target.value)}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input
                          type="date"
                          value={formData.end_date}
                          onChange={(e) => handleInputChange('end_date', e.target.value)}
                        />
                        <FormHelperText>
                          Leave empty if project is ongoing
                        </FormHelperText>
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe your project..."
                          rows={4}
                          resize="vertical"
                        />
                        <FormHelperText>
                          Describe the project, its purpose, and the problems it solves.
                        </FormHelperText>
                      </FormControl>
                    </GridItem>

                    {/* Client Field for Professional Projects */}
                    {formData.project_type === 'professional' && (
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel>Client/Organization</FormLabel>
                          <Input
                            value={formData.client}
                            onChange={(e) => handleInputChange('client', e.target.value)}
                            placeholder="Company or organization name"
                          />
                          <FormHelperText>
                            The client or organization you worked with on this project
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                    )}

                    {/* Project Links */}
                    <GridItem>
                      <FormControl>
                        <FormLabel>Project URL</FormLabel>
                        <InputGroup>
                          <InputLeftElement>
                            <FaExternalLinkAlt />
                          </InputLeftElement>
                          <Input
                            value={formData.url}
                            onChange={(e) => handleInputChange('url', e.target.value)}
                            placeholder="https://project-url.com"
                          />
                        </InputGroup>
                        <FormHelperText>
                          GitHub repository, portfolio piece, or project link
                        </FormHelperText>
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Demo/Live URL</FormLabel>
                        <InputGroup>
                          <InputLeftElement>
                            <FaExternalLinkAlt />
                          </InputLeftElement>
                          <Input
                            value={formData.demo_link}
                            onChange={(e) => handleInputChange('demo_link', e.target.value)}
                            placeholder="https://demo-url.com"
                          />
                        </InputGroup>
                        <FormHelperText>
                          Live demo, published work, or presentation link
                        </FormHelperText>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  {/* Tools & Technologies */}
                  <Box>
                    <FormLabel>Tools & Technologies Used</FormLabel>
                    <VStack spacing={3} align="stretch">
                      <Text fontSize="sm" color="gray.600">
                        Add the tools, software, technologies, or techniques you used for this project.
                      </Text>
                      <HStack>
                        <Input
                          value={currentTech}
                          onChange={(e) => setCurrentTech(e.target.value)}
                          placeholder="Add tool or technology..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTechnology();
                            }
                          }}
                        />
                        <IconButton
                          aria-label="Add technology"
                          icon={<FaPlus />}
                          onClick={() => handleAddTechnology()}
                          colorScheme="brand"
                        />
                      </HStack>
                      
                      {/* Quick Add Buttons for Common Tools */}
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Quick Add:</Text>
                        <Wrap spacing={2}>
                          {commonTools.slice(0, 15).map(tool => (
                            <WrapItem key={tool}>
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => {
                                  if (!(formData.technologies || []).includes(tool)) {
                                    setFormData(prev => ({
                                      ...prev,
                                      technologies: [...(prev.technologies || []), tool]
                                    }));
                                  }
                                }}
                                isDisabled={(formData.technologies || []).includes(tool)}
                              >
                                {tool}
                              </Button>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Box>
                      
                      {/* Selected Technologies */}
                      <Box bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md" minH="80px">
                        <Wrap>
                          {(formData.technologies || []).map((tech, index) => (
                            <WrapItem key={index}>
                              <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="blue"
                                m={1}
                              >
                                <TagLabel>{tech}</TagLabel>
                                <TagCloseButton
                                  onClick={() => handleRemoveTechnology(tech)}
                                />
                              </Tag>
                            </WrapItem>
                          ))}
                          
                          {(!formData.technologies || formData.technologies.length === 0) && (
                            <Text color="gray.500" fontSize="sm">
                              No technologies added yet. Add the technologies you used in this project.
                            </Text>
                          )}
                        </Wrap>
                      </Box>
                    </VStack>
                  </Box>
                  
                  {!isEdit && (
                    <Button 
                      colorScheme="brand" 
                      variant="ghost" 
                      rightIcon={<FaImages />}
                      onClick={() => setActiveTab(1)}
                      alignSelf="end"
                    >
                      Next: Add Media
                    </Button>
                  )}
                </VStack>
              </TabPanel>

              {/* Media Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Text fontWeight="medium" fontSize="lg">
                    Project Image
                  </Text>
                  <Text color="gray.600">
                    Add a screenshot or image that represents your project. This will be displayed on your portfolio.
                  </Text>
                  
                  {/* Project Image */}
                  <Box>
                    <VStack spacing={3}>
                      {imagePreview ? (
                        <Box
                          position="relative"
                          w="full"
                          h="250px"
                          borderRadius="md"
                          overflow="hidden"
                          bg={cardBg}
                          border="2px dashed"
                          borderColor="gray.300"
                        >
                          <Image
                            src={imagePreview}
                            alt="Project preview"
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                          <IconButton
                            aria-label="Remove image"
                            icon={<FaTimes />}
                            size="sm"
                            position="absolute"
                            top={2}
                            right={2}
                            colorScheme="red"
                            onClick={() => {
                              setImagePreview('');
                              setFormData(prev => ({ ...prev, image_url: '' }));
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          w="full"
                          h="250px"
                          borderRadius="md"
                          border="2px dashed"
                          borderColor="gray.300"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          cursor="pointer"
                          _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <VStack spacing={2}>
                            <FaUpload size={24} color="gray" />
                            <Text color="gray.500">
                              Click to upload project image
                            </Text>
                          </VStack>
                        </Box>
                      )}
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      
                      <HStack spacing={4}>
                        <Button
                          leftIcon={<FaUpload />}
                          size="md"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {imagePreview ? 'Change Image' : 'Upload Image'}
                        </Button>
                        
                        <Button
                          leftIcon={<FaCode />}
                          size="md"
                          variant="outline"
                          onClick={handleGenerateImage}
                          isDisabled={!formData.description}
                        >
                          Generate from Description
                        </Button>
                      </HStack>
                      
                      <Text fontSize="xs" color="gray.500">
                        Max file size: 10MB. Supports JPG, PNG, GIF, WebP
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
            {!isEdit && activeTab > 0 && (
              <Button variant="ghost" onClick={() => setActiveTab(activeTab - 1)}>
                Back
              </Button>
            )}
            
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            
            <Button
              colorScheme="brand"
              onClick={handleSave}
              isLoading={isLoading}
              loadingText="Saving..."
            >
              {isEdit ? 'Update Project' : 'Save Project'}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
