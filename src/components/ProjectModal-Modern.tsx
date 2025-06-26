'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Badge,
  Wrap,
  WrapItem,
  Divider,
  useColorModeValue,
  Box,
  IconButton,
  Link
} from '@chakra-ui/react';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaCalendarAlt,
  FaUser,
  FaTag
} from 'react-icons/fa';

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

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('blue.500', 'blue.400');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent 
        bg={bgColor} 
        borderRadius="3xl" 
        shadow="2xl"
        border="1px"
        borderColor={borderColor}
        mx={4}
      >
        <ModalHeader pb={2}>
          <VStack align="start" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {project.title}
            </Text>
            {project.project_type && (
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {project.project_type}
              </Badge>
            )}
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Project Image */}
            {project.image_url && (
              <Box borderRadius="2xl" overflow="hidden" shadow="lg">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  w="full"
                  h="300px"
                  objectFit="cover"
                />
              </Box>
            )}

            {/* Project Description */}
            <Box>
              <Text fontSize="lg" color={textColor} lineHeight="tall">
                {project.description}
              </Text>
            </Box>

            <Divider />

            {/* Project Details */}
            <VStack spacing={4} align="stretch">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <Box>
                  <HStack align="center" mb={3}>
                    <FaTag color={accentColor} />
                    <Text fontWeight="semibold" color={textColor}>
                      Technologies
                    </Text>
                  </HStack>
                  <Wrap spacing={3}>
                    {project.technologies.map((tech, index) => (
                      <WrapItem key={index}>
                        <Badge
                          variant="subtle"
                          colorScheme="blue"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="sm"
                        >
                          {tech}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}

              {/* Client */}
              {project.client && (
                <HStack>
                  <FaUser color={accentColor} />
                  <Text fontWeight="semibold" color={textColor}>Client:</Text>
                  <Text color={mutedColor}>{project.client}</Text>
                </HStack>
              )}

              {/* Status */}
              {project.status && (
                <HStack>
                  <Box w={3} h={3} bg={project.status === 'completed' ? 'green.400' : 'yellow.400'} borderRadius="full" />
                  <Text fontWeight="semibold" color={textColor}>Status:</Text>
                  <Text color={mutedColor} textTransform="capitalize">{project.status}</Text>
                </HStack>
              )}

              {/* Date Range */}
              {(project.start_date || project.end_date) && (
                <HStack>
                  <FaCalendarAlt color={accentColor} />
                  <Text fontWeight="semibold" color={textColor}>Duration:</Text>
                  <Text color={mutedColor}>
                    {project.start_date && new Date(project.start_date).toLocaleDateString()}
                    {project.start_date && project.end_date && ' - '}
                    {project.end_date && new Date(project.end_date).toLocaleDateString()}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Divider />

            {/* Action Buttons */}
            <HStack spacing={4} justify="center" pt={4}>
              {project.url && (
                <Button
                  as={Link}
                  href={project.url}
                  target="_blank"
                  leftIcon={<FaExternalLinkAlt />}
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  _hover={{ textDecoration: 'none' }}
                >
                  View Live Demo
                </Button>
              )}
              
              {project.github_url && (
                <Button
                  as={Link}
                  href={project.github_url}
                  target="_blank"
                  leftIcon={<FaGithub />}
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  _hover={{ textDecoration: 'none' }}
                >
                  View Code
                </Button>
              )}
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
