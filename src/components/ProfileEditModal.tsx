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
  Select,
  Avatar,
  Box,
  Text,
  useToast,
  Divider,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tooltip,
  FormHelperText,
  Badge,
  useColorModeValue,
  Switch,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaUpload,
  FaPlus,
  FaTimes,
  FaBuilding,
  FaPhone,
  FaCheckCircle,
  FaInfoCircle,
  FaDownload,
  FaLanguage,
  FaUniversity,
  FaPalette,
  FaCode,
  FaUserTie,
  FaInstagram,
  FaBehance,
  FaDribbble,
  FaYoutube,
  FaFacebook,
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { DatabaseUser } from '@/types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: DatabaseUser | null;
  onSave: (profile: DatabaseUser) => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  userProfile,
  onSave,
}: ProfileEditModalProps) {
  const { data: session } = useSession();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Partial<DatabaseUser>>({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    behance: '',
    dribbble: '',
    youtube: '',
    facebook: '',
    avatar_url: '',
    skills: [],
    job_title: '',
    field_of_work: '',
    years_of_experience: 0,
    phone: '',
  });
  
  const [currentSkill, setCurrentSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [tabIndex, setTabIndex] = useState(0);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvName, setCvName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customizationOptions, setCustomizationOptions] = useState({
    showSkills: true,
    showProjects: true,
    enableDarkMode: true,
    accentColor: 'blue',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
      setAvatarPreview(userProfile.avatar_url || '');
      // Get filename from CV URL if exists
      if (userProfile.cv_url) {
        const filename = userProfile.cv_url.split('/').pop() || 'Resume.pdf';
        setCvName(filename);
      }
    } else if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        bio: '',
        location: '',
        website: '',
        linkedin: '',
        twitter: '',
        avatar_url: session.user.image || '',
        skills: [],
        job_title: '',
        phone: '',
        github_username: session.user.github_username || '',
      });
      setAvatarPreview(session.user.image || '');
    }
  }, [userProfile, session]);

  const handleInputChange = (field: keyof DatabaseUser, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !(formData.skills || []).includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), currentSkill.trim()],
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill !== skillToRemove),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Image must be smaller than 5MB',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({
          ...prev,
          avatar_url: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Resume/CV must be smaller than 10MB',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      if (!file.type.includes('pdf')) {
        toast({
          title: 'Invalid file type',
          description: 'Only PDF files are supported',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      setCvFile(file);
      setCvName(file.name);
      
      // In a real implementation, you would upload the file to Supabase Storage
      // and get a URL to store in the user profile
      setFormData(prev => ({
        ...prev,
        cv_url: URL.createObjectURL(file), // Temporary URL for preview
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    
    if (formData.linkedin && !formData.linkedin.startsWith('http')) {
      newErrors.linkedin = 'LinkedIn URL must start with http:// or https://';
    }
    
    if (formData.twitter && !formData.twitter.startsWith('http')) {
      newErrors.twitter = 'Twitter URL must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: 'Please fix the errors in the form',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this is where you would:
      // 1. Upload the CV file to Supabase Storage if changed
      // 2. Save the user profile data to the database
      
      // For now, just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save customization options to the user profile
      const updatedProfile = {
        ...formData as DatabaseUser,
        theme_settings: customizationOptions
      };
      
      onSave(updatedProfile);
      toast({
        title: 'Profile updated successfully!',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error saving profile',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed" index={tabIndex} onChange={setTabIndex} colorScheme="brand">
            <TabList mb="1em">
              <Tab>
                <HStack>
                  <FaUser />
                  <Text>Basic Info</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaGlobe />
                  <Text>Social</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaCode />
                  <Text>Skills</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaPalette />
                  <Text>Customize</Text>
                </HStack>
              </Tab>
            </TabList>
            
            <TabPanels>
              {/* Basic Information Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  {/* Avatar Section */}
                  <Box textAlign="center">
                    <VStack spacing={3}>
                      <Avatar
                        size="xl"
                        src={avatarPreview}
                        name={formData.name}
                        border="2px solid"
                        borderColor="gray.200"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <Button
                        leftIcon={<FaUpload />}
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Avatar
                      </Button>
                      <Text fontSize="xs" color="gray.500">
                        Max file size: 5MB. Supports JPG, PNG, GIF
                      </Text>
                    </VStack>
                  </Box>

                  <Divider />

                  {/* Basic Information */}
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                      Personal Information
                    </Text>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.name}>
                          <FormLabel>
                            Full Name
                            <Tooltip label="This is your display name on your portfolio">
                              <IconButton
                                aria-label="Info"
                                icon={<FaInfoCircle />}
                                size="xs"
                                variant="ghost"
                                ml={1}
                              />
                            </Tooltip>
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaUser color="gray" />
                            </InputLeftElement>
                            <Input
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter your full name"
                            />
                          </InputGroup>
                          {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel>Job Title</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaBuilding />
                            </InputLeftElement>
                            <Input
                              value={formData.job_title}
                              onChange={(e) => handleInputChange('job_title', e.target.value)}
                              placeholder="e.g., Full Stack Developer"
                            />
                          </InputGroup>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl isRequired isInvalid={!!errors.email}>
                          <FormLabel>Email</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaEnvelope color="gray" />
                            </InputLeftElement>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="your@email.com"
                            />
                          </InputGroup>
                          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel>Phone</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaPhone />
                            </InputLeftElement>
                            <Input
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+966 50 123 4567"
                            />
                          </InputGroup>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel>Job Title</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaUserTie />
                            </InputLeftElement>
                            <Input
                              value={formData.job_title}
                              onChange={(e) => handleInputChange('job_title', e.target.value)}
                              placeholder="e.g., Graphic Designer, Marketing Manager"
                            />
                          </InputGroup>
                          <FormHelperText>
                            Your current or desired job title
                          </FormHelperText>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel>Field of Work</FormLabel>
                          <Select
                            value={formData.field_of_work || ''}
                            onChange={(e) => handleInputChange('field_of_work', e.target.value)}
                            placeholder="Select your field"
                          >
                            <option value="Technology">Technology & IT</option>
                            <option value="Design">Design & Creative</option>
                            <option value="Marketing">Marketing & Sales</option>
                            <option value="Business">Business & Management</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Healthcare">Healthcare & Medicine</option>
                            <option value="Education">Education & Training</option>
                            <option value="Finance">Finance & Accounting</option>
                            <option value="Law">Law & Legal Services</option>
                            <option value="Media">Media & Communications</option>
                            <option value="Architecture">Architecture & Construction</option>
                            <option value="Science">Science & Research</option>
                            <option value="Arts">Arts & Entertainment</option>
                            <option value="Sports">Sports & Fitness</option>
                            <option value="Hospitality">Hospitality & Tourism</option>
                            <option value="Non-profit">Non-profit & Social Work</option>
                            <option value="Government">Government & Public Service</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Freelance">Freelance & Self-employed</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormControl>
                      </GridItem>

                      <GridItem>
                        <FormControl>
                          <FormLabel>Years of Experience</FormLabel>
                          <Select
                            value={formData.years_of_experience?.toString() || ''}
                            onChange={(e) => handleInputChange('years_of_experience', e.target.value)}
                            placeholder="Select experience level"
                          >
                            <option value="0">Fresh Graduate / No Experience</option>
                            <option value="1">1-2 years</option>
                            <option value="3">3-5 years</option>
                            <option value="6">6-10 years</option>
                            <option value="11">11-15 years</option>
                            <option value="16">16+ years</option>
                          </Select>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <FaMapMarkerAlt color="gray" />
                            </InputLeftElement>
                            <Input
                              value={formData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                              placeholder="e.g., Riyadh, Saudi Arabia"
                            />
                          </InputGroup>
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel>Bio</FormLabel>
                          <Textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            resize="vertical"
                          />
                          <FormHelperText>
                            Write a brief description about yourself, your experience, and what you're passionate about.
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel>
                            Resume/CV
                            <Badge colorScheme="green" ml={2} fontSize="xs">
                              Recommended
                            </Badge>
                          </FormLabel>
                          <InputGroup>
                            <Input
                              value={cvName}
                              placeholder="Upload your resume/CV (PDF)"
                              isReadOnly
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => cvInputRef.current?.click()}
                              >
                                Upload
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <input
                            type="file"
                            ref={cvInputRef}
                            onChange={handleCvUpload}
                            accept="application/pdf"
                            style={{ display: 'none' }}
                          />
                          <FormHelperText>
                            Max file size: 10MB. Only PDF files are supported.
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Social Links Tab */}
              <TabPanel>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Social Links & Connections
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>GitHub Username</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaGithub color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.github_username}
                          onChange={(e) => handleInputChange('github_username', e.target.value)}
                          placeholder="Your GitHub username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        This is used to fetch your GitHub repositories.
                      </FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!errors.website}>
                      <FormLabel>Personal Website</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaGlobe color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourwebsite.com"
                        />
                      </InputGroup>
                      {errors.website ? (
                        <FormErrorMessage>{errors.website}</FormErrorMessage>
                      ) : (
                        <FormHelperText>
                          Include the full URL with http:// or https://
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.linkedin}>
                      <FormLabel>LinkedIn</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaLinkedin color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </InputGroup>
                      {errors.linkedin ? (
                        <FormErrorMessage>{errors.linkedin}</FormErrorMessage>
                      ) : (
                        <FormHelperText>
                          Include the full URL with http:// or https://
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.twitter}>
                      <FormLabel>Twitter</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaTwitter color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.twitter}
                          onChange={(e) => handleInputChange('twitter', e.target.value)}
                          placeholder="https://twitter.com/username"
                        />
                      </InputGroup>
                      {errors.twitter ? (
                        <FormErrorMessage>{errors.twitter}</FormErrorMessage>
                      ) : (
                        <FormHelperText>
                          Include the full URL with http:// or https://
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Instagram</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaInstagram color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.instagram}
                          onChange={(e) => handleInputChange('instagram', e.target.value)}
                          placeholder="https://instagram.com/username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        Great for photographers, artists, and influencers
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Behance</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaBehance color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.behance}
                          onChange={(e) => handleInputChange('behance', e.target.value)}
                          placeholder="https://behance.net/username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        Perfect for designers and creative professionals
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Dribbble</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaDribbble color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.dribbble}
                          onChange={(e) => handleInputChange('dribbble', e.target.value)}
                          placeholder="https://dribbble.com/username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        Showcase your design work and inspiration
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>YouTube</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaYoutube color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.youtube}
                          onChange={(e) => handleInputChange('youtube', e.target.value)}
                          placeholder="https://youtube.com/@username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        Share your videos, tutorials, or content
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Facebook</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <FaFacebook color="gray" />
                        </InputLeftElement>
                        <Input
                          value={formData.facebook}
                          onChange={(e) => handleInputChange('facebook', e.target.value)}
                          placeholder="https://facebook.com/username"
                        />
                      </InputGroup>
                      <FormHelperText>
                        Connect with your professional or personal network
                      </FormHelperText>
                    </FormControl>
                  </VStack>
                </Box>
              </TabPanel>

              {/* Skills Tab */}
              <TabPanel>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Skills & Expertise
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="sm" color="gray.600">
                      Add your professional skills, tools, software, and expertise areas that showcase your abilities.
                    </Text>
                    
                    <Box bg={useColorModeValue('blue.50', 'blue.900')} p={3} borderRadius="md">
                      <Text fontSize="sm" fontWeight="medium" mb={2}>💡 Skill Examples by Field:</Text>
                      <Text fontSize="xs" color="gray.600">
                        <strong>Design:</strong> Adobe Creative Suite, Figma, UI/UX, Branding, Typography<br/>
                        <strong>Marketing:</strong> SEO, Social Media, Content Strategy, Analytics, Campaign Management<br/>
                        <strong>Business:</strong> Project Management, Leadership, Strategic Planning, Analysis<br/>
                        <strong>Healthcare:</strong> Patient Care, Medical Research, Clinical Skills, EMR Systems<br/>
                        <strong>Education:</strong> Curriculum Development, Classroom Management, Educational Technology<br/>
                        <strong>General:</strong> Communication, Problem Solving, Team Work, Time Management
                      </Text>
                    </Box>
                    
                    <HStack>
                      <Input
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <Tooltip label="Add skill">
                        <IconButton
                          aria-label="Add skill"
                          icon={<FaPlus />}
                          onClick={handleAddSkill}
                          colorScheme="brand"
                        />
                      </Tooltip>
                    </HStack>
                    
                    <Box bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md" minH="100px">
                      <Wrap>
                        {(formData.skills || []).map((skill, index) => (
                          <WrapItem key={index}>
                            <Tag
                              size="md"
                              borderRadius="full"
                              variant="solid"
                              colorScheme="blue"
                              m={1}
                            >
                              <TagLabel>{skill}</TagLabel>
                              <TagCloseButton
                                onClick={() => handleRemoveSkill(skill)}
                              />
                            </Tag>
                          </WrapItem>
                        ))}
                        
                        {(!formData.skills || formData.skills.length === 0) && (
                          <Text color="gray.500" fontSize="sm">
                            No skills added yet. Add your technical and professional skills.
                          </Text>
                        )}
                      </Wrap>
                    </Box>
                    
                    <Text fontSize="sm" fontWeight="medium" mt={4}>
                      Skill suggestions:
                    </Text>
                    <Wrap>
                      {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Next.js', 'Python', 'HTML/CSS', 'SQL', 'UI/UX Design', 'Product Management'].map((skill) => (
                        <WrapItem key={skill}>
                          <Tag
                            size="sm"
                            borderRadius="full"
                            variant="outline"
                            colorScheme="gray"
                            cursor="pointer"
                            onClick={() => {
                              if (!(formData.skills || []).includes(skill)) {
                                setFormData(prev => ({
                                  ...prev,
                                  skills: [...(prev.skills || []), skill],
                                }));
                              }
                            }}
                            _hover={{ bg: 'gray.100' }}
                          >
                            + {skill}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </VStack>
                </Box>
              </TabPanel>
              
              {/* Customize Tab */}
              <TabPanel>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Portfolio Customization
                  </Text>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Customize the appearance and settings of your portfolio.
                    </Text>

                    {/* Display Options */}
                    <Box>
                      <Text fontWeight="medium" mb={3}>Display Options</Text>
                      
                      <VStack spacing={4} align="stretch">
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="show-skills" mb="0">
                            Show Skills Section
                          </FormLabel>
                          <Switch
                            id="show-skills"
                            isChecked={customizationOptions.showSkills}
                            onChange={(e) => setCustomizationOptions(prev => ({
                              ...prev,
                              showSkills: e.target.checked
                            }))}
                            colorScheme="brand"
                          />
                        </FormControl>
                        
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="show-projects" mb="0">
                            Show Projects Section
                          </FormLabel>
                          <Switch
                            id="show-projects"
                            isChecked={customizationOptions.showProjects}
                            onChange={(e) => setCustomizationOptions(prev => ({
                              ...prev,
                              showProjects: e.target.checked
                            }))}
                            colorScheme="brand"
                          />
                        </FormControl>
                    
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="enable-dark-mode" mb="0">
                        Enable Dark Mode Toggle
                      </FormLabel>
                      <Switch
                        id="enable-dark-mode"
                        isChecked={customizationOptions.enableDarkMode}
                        onChange={(e) => setCustomizationOptions(prev => ({
                          ...prev,
                          enableDarkMode: e.target.checked
                        }))}
                        colorScheme="brand"
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Accent Color</FormLabel>
                      <Select
                        value={customizationOptions.accentColor}
                        onChange={(e) => setCustomizationOptions(prev => ({
                          ...prev,
                          accentColor: e.target.value
                        }))}
                      >
                        <option value="blue">Blue</option>
                        <option value="teal">Teal</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                      </Select>
                      <FormHelperText>
                        Choose the primary color for your portfolio.
                      </FormHelperText>
                    </FormControl>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
            {tabIndex > 0 && (
              <Button variant="ghost" onClick={() => setTabIndex(tabIndex - 1)}>
                Previous
              </Button>
            )}
            
            {tabIndex < 3 && (
              <Button colorScheme="blue" onClick={() => setTabIndex(tabIndex + 1)}>
                Next
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
              Save Changes
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
