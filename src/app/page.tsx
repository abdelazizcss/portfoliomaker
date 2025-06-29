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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaUser, FaRocket, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session, status } = useSession();
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  const handleAuthAction = () => {
    if (session) {
      // User is signed in, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // User is not signed in, redirect to sign in
      signIn('github');
    }
  };

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
            
            {status === 'loading' ? (
              <Button isLoading variant="outline">
                جاري التحميل...
              </Button>
            ) : session ? (
              <Menu>
                <MenuButton as={Button} variant="ghost">
                  <HStack spacing={2}>
                    <Avatar size="sm" src={session.user?.image || ''} />
                    <Text>{session.user?.name}</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} href="/dashboard" icon={<FaUser />}>
                    لوحة التحكم
                  </MenuItem>
                  <MenuItem 
                    icon={<FaSignOutAlt />} 
                    onClick={() => signOut()}
                  >
                    تسجيل الخروج
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button leftIcon={<FaGithub />} variant="outline" onClick={() => signIn('github')}>
                تسجيل الدخول
              </Button>
            )}
          </HStack>
        </HStack>
      </Container>

      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} textAlign="center">
          <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
            🚀 Create Your Professional Portfolio for Any Field
          </Badge>
          
          <Heading size="2xl" maxW="600px" lineHeight="1.2">
            Build Your Professional Portfolio in Minutes
          </Heading>
          
          <Text fontSize="xl" color="gray.600" maxW="500px">
            Whether you're a designer, developer, marketer, engineer, or any other professional - 
            create a stunning portfolio that showcases your work and expertise.
          </Text>

          <HStack spacing={4}>
            <Button 
              size="lg" 
              leftIcon={<FaRocket />}
              onClick={handleAuthAction}
            >
              {session ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <Button size="lg" variant="outline" leftIcon={<FaUser />} as={Link} href="/portfolio/demo">
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
                <Heading size="md">Easy Integration</Heading>
                <Text color="gray.600">
                  Connect your GitHub, Behance, Dribbble, and other professional
                  platforms to showcase your work effortlessly.
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
                  Beautiful, responsive templates designed for all professions - 
                  from creative to corporate, academic to entrepreneurial.
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
