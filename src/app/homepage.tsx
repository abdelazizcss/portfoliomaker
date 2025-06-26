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
          <Badge colorScheme="blue" px={3} py={1} borderRadius="md">
            🚀 أنشئ بورتفوليو احترافي لأي مجال أو تخصص
          </Badge>
          
          <Heading size="2xl" maxW="600px" lineHeight="1.2" className="professional-heading">
            معرض أعمالك الاحترافي بنقرات قليلة
          </Heading>
          
          <Text
            fontSize="xl"
            color="gray.600"
            maxW="xl"
            textAlign="center"
            mb={6}
            _dark={{ color: 'gray.300' }}
          >
            منصة احترافية لإنشاء معرض أعمالك الشخصي. متوافقة مع جميع المجالات المهنية والتخصصات.
          </Text>

          <HStack spacing={4}>
            <Button
              as={Link}
              href="/dashboard"
              size="lg"
              colorScheme="blue"
              leftIcon={<FaRocket />}
              className="clean-button"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={handleAuthAction}
            >
              {session ? 'لوحة التحكم' : 'إنشاء بورتفوليو'}
            </Button>
            <Button
              as="a"
              href="https://github.com/yourusername/portfolio-maker"
              target="_blank"
              size="lg"
              leftIcon={<FaGithub />}
              variant="outline"
              className="clean-button"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              المشروع على GitHub
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section - Clean Modern Design */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={10}>
          <Heading size="xl" textAlign="center" fontWeight="700">
            مميزات بورتفوليو ميكر
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={5} 
              borderRadius="md" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              className="clean-card"
            >
              <VStack spacing={3} textAlign="center">
                <Box bg={useColorModeValue('blue.50', 'blue.900')} p={3} borderRadius="md">
                  <FaRocket size={24} color={useColorModeValue('#3182CE', '#63B3ED')} />
                </Box>
                <Heading size="md" fontWeight="600">تصميم احترافي</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  تصاميم جذابة ومتجاوبة مصممة لجميع المجالات المهنية - 
                  من الإبداعية إلى التقنية والأكاديمية.
                </Text>
              </VStack>
            </Box>

            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={5} 
              borderRadius="md" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              className="clean-card"
            >
              <VStack spacing={3} textAlign="center">
                <Box bg={useColorModeValue('green.50', 'green.900')} p={3} borderRadius="md">
                  <FaUser size={24} color={useColorModeValue('#38A169', '#68D391')} />
                </Box>
                <Heading size="md" fontWeight="600">جميع التخصصات</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  تدعم المنصة جميع المجالات المهنية: المصممين، المسوقين، المهندسين،
                  المبرمجين، الأطباء، المعلمين، وغيرهم.
                </Text>
              </VStack>
            </Box>

            <Box 
              bg={useColorModeValue('white', 'gray.800')} 
              p={5} 
              borderRadius="md" 
              boxShadow="sm"
              border="1px solid"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              className="clean-card"
            >
              <VStack spacing={3} textAlign="center">
                <Box bg={useColorModeValue('purple.50', 'purple.900')} p={3} borderRadius="md">
                  <FaGithub size={24} color={useColorModeValue('#805AD5', '#B794F4')} />
                </Box>
                <Heading size="md" fontWeight="600">سهولة الاستخدام</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  واجهة بسيطة وسهلة الاستخدام تمكنك من إنشاء معرض أعمالك
                  بسرعة ومشاركته مع العالم.
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Footer - Simplified */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={6} mt={6} borderTop="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
        <Container maxW="container.xl">
          <HStack justify="space-between" wrap="wrap">
            <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
              © 2025 بورتفوليو ميكر. جميع الحقوق محفوظة.
            </Text>
            <HStack spacing={4}>
              <Text as="a" href="#" color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" _hover={{ color: 'blue.500' }}>
                الشروط والأحكام
              </Text>
              <Text as="a" href="#" color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" _hover={{ color: 'blue.500' }}>
                سياسة الخصوصية
              </Text>
              <Text as="a" href="#" color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" _hover={{ color: 'blue.500' }}>
                تواصل معنا
              </Text>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
