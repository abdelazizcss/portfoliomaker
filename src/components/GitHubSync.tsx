'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Checkbox,
  Divider,
  Badge,
  useToast,
  useColorModeValue,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaSync,
  FaSearch,
  FaStar,
  FaCodeBranch,
  FaPlus,
  FaTimes,
  FaExternalLinkAlt,
  FaFilter,
} from 'react-icons/fa';
import { githubAPI } from '@/lib/api';
import { GitHubRepo, Project } from '@/types';

interface GitHubSyncProps {
  onImportComplete: (projects: Project[]) => void;
  githubUsername?: string;
}

export default function GitHubSync({ onImportComplete, githubUsername }: GitHubSyncProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'code' | 'template' | 'public'>('all');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Load repositories on component mount
  useEffect(() => {
    if (githubUsername) {
      fetchRepositories();
    }
  }, [githubUsername]);
  
  // Filter repositories when search query or filter changes
  useEffect(() => {
    if (!repos.length) return;
    
    let filtered = repos;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        repo => 
          repo.name.toLowerCase().includes(query) || 
          (repo.description && repo.description.toLowerCase().includes(query))
      );
    }      // Apply category filter
    if (filter !== 'all') {
      if (filter === 'public') {
        // All repos are public by default unless specifically marked private
        filtered = filtered.filter(repo => !repo.private as boolean);
      } else if (filter === 'template') {
        filtered = filtered.filter(repo => repo.topics.some(topic => 
          topic.includes('template') || topic.includes('boilerplate') || topic.includes('starter')
        ));
      } else if (filter === 'code') {
        filtered = filtered.filter(repo => 
          repo.language && 
          !repo.topics.some(topic => topic.includes('template') || topic.includes('boilerplate'))
        );
      }
    }
    
    setFilteredRepos(filtered);
  }, [repos, searchQuery, filter]);
  
  const fetchRepositories = async () => {
    if (!githubUsername) {
      setError('GitHub username is required. Please update your profile first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const repositories = await githubAPI.getRepositories();
      setRepos(repositories);
      setFilteredRepos(repositories);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch GitHub repositories');
      toast({
        title: 'Error fetching repositories',
        description: error.message || 'Please try again later',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleRepo = (repoFullName: string) => {
    setSelectedRepos(prev => {
      if (prev.includes(repoFullName)) {
        return prev.filter(name => name !== repoFullName);
      } else {
        return [...prev, repoFullName];
      }
    });
  };
  
  const handleImportRepositories = async () => {
    if (selectedRepos.length === 0) {
      toast({
        title: 'No repositories selected',
        description: 'Please select at least one repository to import',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsImporting(true);
    
    try {
      const importedProjects = await githubAPI.syncRepositories(selectedRepos);
      
      toast({
        title: 'Repositories imported successfully',
        description: `Imported ${importedProjects.length} repositories as projects`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onImportComplete(importedProjects);
      setSelectedRepos([]);
      onClose();
    } catch (error: any) {
      // Check for specific error messages that we can provide better guidance for
      let errorMessage = error.message || 'Please try again later';
      let errorTitle = 'Error importing repositories';
      
      if (errorMessage.includes('Row Level Security') || errorMessage.includes('permission denied')) {
        errorTitle = 'Database permission error';
        errorMessage = 'There is a permission issue with the database. Please check the RLS policies in Supabase.';
      } else if (errorMessage.includes('User not found')) {
        errorTitle = 'Profile incomplete';
        errorMessage = 'Please complete your profile information first before importing projects.';
      } else if (errorMessage.includes('projects table does not exist')) {
        errorTitle = 'Database setup required';
        errorMessage = 'The database schema needs to be initialized. Run the setup SQL script first.';
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  return (
    <>
      <Button 
        leftIcon={<FaGithub />} 
        colorScheme="gray" 
        onClick={onOpen}
        isDisabled={!githubUsername}
      >
        Import from GitHub
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import GitHub Repositories</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            {error ? (
              <Alert status="error" borderRadius="md" mb={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Box>
              </Alert>
            ) : (
              <VStack align="stretch" spacing={4}>
                <Text>
                  Select repositories to import as projects to your portfolio.
                </Text>
                
                <HStack>
                  <InputGroup>
                    <InputLeftElement>
                      <FaSearch color="gray" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search repositories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                  
                  <Tooltip label="Refresh repositories">
                    <IconButton
                      aria-label="Refresh repositories"
                      icon={<FaSync />}
                      onClick={fetchRepositories}
                      isLoading={isLoading}
                    />
                  </Tooltip>
                  
                  <Tooltip label="Filter repositories">
                    <Box position="relative">
                      <IconButton
                        aria-label="Filter repositories"
                        icon={<FaFilter />}
                        onClick={() => {
                          const filters = ['all', 'code', 'template', 'public'];
                          const currentIndex = filters.indexOf(filter);
                          const nextIndex = (currentIndex + 1) % filters.length;
                          setFilter(filters[nextIndex] as any);
                        }}
                      />
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-8px"
                        colorScheme="blue"
                        fontSize="xs"
                        borderRadius="full"
                      >
                        {filter}
                      </Badge>
                    </Box>
                  </Tooltip>
                </HStack>
                
                {isLoading ? (
                  <Flex justify="center" align="center" p={8}>
                    <VStack>
                      <Spinner size="xl" />
                      <Text>Loading repositories...</Text>
                    </VStack>
                  </Flex>
                ) : repos.length === 0 ? (
                  <Box textAlign="center" p={8}>
                    <Text mb={4}>No repositories found</Text>
                    <Button leftIcon={<FaSync />} onClick={fetchRepositories}>
                      Fetch Repositories
                    </Button>
                  </Box>
                ) : filteredRepos.length === 0 ? (
                  <Box textAlign="center" p={8}>
                    <Text mb={4}>No repositories match your search</Text>
                    <Button size="sm" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </Box>
                ) : (
                  <VStack align="stretch" spacing={2} maxH="400px" overflowY="auto">
                    {filteredRepos.map(repo => (
                      <Card 
                        key={repo.id} 
                        size="sm" 
                        variant="outline"
                        bg={selectedRepos.includes(repo.full_name) ? 'blue.50' : cardBg}
                        borderColor={selectedRepos.includes(repo.full_name) ? 'blue.500' : borderColor}
                      >
                        <CardBody>
                          <HStack justify="space-between">
                            <HStack>
                              <Checkbox
                                isChecked={selectedRepos.includes(repo.full_name)}
                                onChange={() => handleToggleRepo(repo.full_name)}
                                colorScheme="blue"
                              />
                              <VStack align="start" spacing={1}>
                                <HStack>
                                  <Text fontWeight="bold">{repo.name}</Text>
                                  {repo.language && (
                                    <Badge colorScheme="blue" fontSize="xs">
                                      {repo.language}
                                    </Badge>
                                  )}
                                </HStack>
                                {repo.description && (
                                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                                    {repo.description}
                                  </Text>
                                )}
                              </VStack>
                            </HStack>
                            
                            <HStack>
                              <Tooltip label="Stars">
                                <HStack spacing={1}>
                                  <FaStar size={14} />
                                  <Text fontSize="sm">{repo.stargazers_count}</Text>
                                </HStack>
                              </Tooltip>
                              
                              <Tooltip label="Visit repository">
                                <IconButton
                                  aria-label="Visit repository"
                                  icon={<FaExternalLinkAlt />}
                                  size="xs"
                                  variant="ghost"
                                  as="a"
                                  href={repo.html_url}
                                  target="_blank"
                                />
                              </Tooltip>
                            </HStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                )}
                
                {selectedRepos.length > 0 && (
                  <HStack justify="space-between" p={2} bg="blue.50" borderRadius="md">
                    <Text>
                      {selectedRepos.length} {selectedRepos.length === 1 ? 'repository' : 'repositories'} selected
                    </Text>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedRepos([])}>
                      Clear
                    </Button>
                  </HStack>
                )}
              </VStack>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleImportRepositories}
              isLoading={isImporting}
              loadingText="Importing..."
              isDisabled={selectedRepos.length === 0}
            >
              Import Selected
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
