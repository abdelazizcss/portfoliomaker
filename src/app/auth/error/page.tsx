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
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  const getErrorMessage = (error: string | null) => {
    if (!error) return 'حدث خطأ غير متوقع أثناء تسجيل الدخول.';
    
    switch (error) {
      case 'Configuration':
        return 'خطأ في إعدادات المصادقة. يرجى الاتصال بالدعم الفني.';
      case 'AccessDenied':
        return 'تم رفض الوصول. قد تحتاج إلى أذونات إضافية.';
      case 'Verification':
        return 'فشل في التحقق من البيانات. يرجى المحاولة مرة أخرى.';
      default:
        return 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.';
    }
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center">
      <Container maxW="md">
        <Card>
          <CardBody>
            <VStack spacing={6} textAlign="center">
              <Box>
                <Heading size="lg" color="red.500" mb={2}>
                  خطأ في تسجيل الدخول
                </Heading>
              </Box>

              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {getErrorMessage(error)}
              </Alert>

              <VStack spacing={3} w="full">
                <Button
                  as={Link}
                  href="/auth/signin"
                  leftIcon={<FaArrowLeft />}
                  colorScheme="brand"
                  size="lg"
                  w="full"
                >
                  المحاولة مرة أخرى
                </Button>
                
                <Button
                  as={Link}
                  href="/"
                  leftIcon={<FaHome />}
                  variant="outline"
                  size="lg"
                  w="full"
                >
                  العودة للصفحة الرئيسية
                </Button>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}
