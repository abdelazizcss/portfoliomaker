'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorMode,
  IconButton,
  Badge,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaUser, FaRocket } from 'react-icons/fa';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Header */}
      <Container maxW="container.xl" pt={4}>
        <HStack justify="space-between" align="center">
          <Heading size="lg" color="brand.500">
            Portfolio Maker
          </Heading>
          <HStack spacing={4}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            <Button leftIcon={<FaGithub />} variant="outline">
              Sign in with GitHub
            </Button>
          </HStack>
        </HStack>
      </Container>

      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} textAlign="center">
          <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
            🚀 Create Your Professional Portfolio
          </Badge>
          
          <Heading size="2xl" maxW="600px" lineHeight="1.2">
            Build Beautiful Portfolios in{' '}
            <Text as="span" color="brand.500">
              Minutes
            </Text>
          </Heading>

          <Text fontSize="xl" maxW="500px" color="gray.600">
            Create stunning, professional portfolios with our easy-to-use template.
            Connect with GitHub, add your projects, and share your work with the world.
          </Text>

          <HStack spacing={4}>
            <Button size="lg" leftIcon={<FaRocket />}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" leftIcon={<FaUser />}>
              View Demo
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Heading size="xl" textAlign="center">
            Why Choose Portfolio Maker?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <VStack spacing={4} textAlign="center">
                <Box bg="brand.100" p={4} borderRadius="full">
                  <FaGithub size={32} color="#0087ff" />
                </Box>
                <Heading size="md">GitHub Integration</Heading>
                <Text color="gray.600">
                  Seamlessly connect with GitHub to showcase your repositories
                  and contributions.
                </Text>
              </VStack>
            </Box>

            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <VStack spacing={4} textAlign="center">
                <Box bg="green.100" p={4} borderRadius="full">
                  <FaRocket size={32} color="#38A169" />
                </Box>
                <Heading size="md">Quick Setup</Heading>
                <Text color="gray.600">
                  Get your portfolio live in minutes with our intuitive
                  setup process.
                </Text>
              </VStack>
            </Box>

            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <VStack spacing={4} textAlign="center">
                <Box bg="purple.100" p={4} borderRadius="full">
                  <FaUser size={32} color="#805AD5" />
                </Box>
                <Heading size="md">Professional Design</Heading>
                <Text color="gray.600">
                  Beautiful, responsive templates that make you stand out
                  to potential employers.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.100', 'gray.800')} py={8}>
        <Container maxW="container.xl">
          <Text textAlign="center" color="gray.600">
            © 2024 Portfolio Maker. Built with Next.js and Chakra UI.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
