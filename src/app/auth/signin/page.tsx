'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isLoading, setIsLoading] = useState(false);
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('github', {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      
      if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'OAuthSignin':
        return 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.';
      case 'OAuthCallback':
        return 'حدث خطأ أثناء التحقق من البيانات. يرجى المحاولة مرة أخرى.';
      case 'OAuthCreateAccount':
        return 'لا يمكن إنشاء الحساب. يرجى المحاولة مرة أخرى.';
      case 'EmailCreateAccount':
        return 'لا يمكن إنشاء الحساب. يرجى المحاولة مرة أخرى.';
      case 'Callback':
        return 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.';
      case 'OAuthAccountNotLinked':
        return 'هذا البريد الإلكتروني مرتبط بحساب آخر. يرجى تسجيل الدخول بالطريقة الأصلية.';
      case 'EmailSignin':
        return 'لا يمكن إرسال رسالة التحقق. يرجى المحاولة مرة أخرى.';
      case 'CredentialsSignin':
        return 'بيانات تسجيل الدخول غير صحيحة. يرجى المحاولة مرة أخرى.';
      case 'SessionRequired':
        return 'يرجى تسجيل الدخول للوصول إلى هذه الصفحة.';
      default:
        return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
    }
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center">
      <Container maxW="md">
        <Card>
          <CardBody>
            <VStack spacing={6} textAlign="center">
              <Box>
                <Heading size="lg" color="brand.500" mb={2}>
                  Portfolio Maker
                </Heading>
                <Text color="gray.600">
                  سجل الدخول لإنشاء بورتفوليو احترافي
                </Text>
              </Box>

              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {getErrorMessage(error)}
                </Alert>
              )}

              <VStack spacing={4} w="full">
                <Text fontSize="sm" color="gray.600">
                  استخدم حساب GitHub الخاص بك لتسجيل الدخول
                </Text>
                
                <Button
                  leftIcon={<FaGithub />}
                  colorScheme="gray"
                  bg="gray.900"
                  color="white"
                  size="lg"
                  w="full"
                  onClick={handleSignIn}
                  isLoading={isLoading}
                  loadingText="جاري تسجيل الدخول..."
                  _hover={{
                    bg: 'gray.800',
                  }}
                >
                  تسجيل الدخول بـ GitHub
                </Button>
              </VStack>

              <Text fontSize="xs" color="gray.500" textAlign="center">
                بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}
