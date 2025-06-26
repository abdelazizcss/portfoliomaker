import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  HStack,
  Text,
  useToast,
  Link,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { checkGitHubTokenStatus } from '@/lib/github-oauth';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, userName }) => {
  const { data: session } = useSession();
  const [repoName, setRepoName] = useState(`${userName}-portfolio`);
  const [description, setDescription] = useState(`Portfolio website for ${userName}`);
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [error, setError] = useState('');
  const [tokenStatus, setTokenStatus] = useState<{ isValid: boolean; message: string; needsReauth: boolean } | null>(null);
  
  const toast = useToast();

  // Reset repo name when userName changes
  useEffect(() => {
    if (userName) {
      setRepoName(`${userName}-portfolio`);
      setDescription(`Portfolio website for ${userName}`);
    }
  }, [userName]);

  // Check token status when modal opens
  useEffect(() => {
    if (isOpen && session) {
      const checkToken = async () => {
        const status = await checkGitHubTokenStatus(session);
        setTokenStatus(status);
      };
      
      checkToken();
    }
    
    // Reset success state when modal is opened
    if (isOpen) {
      setDeploymentSuccess(false);
      setError('');
    }
  }, [isOpen, session]);

  const handleDeploy = async () => {
    if (!repoName.trim()) {
      toast({
        title: "اسم المستودع مطلوب",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setDeploymentSuccess(false);

      // Check if GitHub token is valid
      const tokenStatus = await checkGitHubTokenStatus(session);
      
      if (!tokenStatus.isValid) {
        // If token is invalid or missing, redirect to GitHub authorization
        if (tokenStatus.needsReauth) {
          toast({
            title: "إعادة المصادقة مطلوبة",
            description: tokenStatus.message,
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          
          // Redirect to GitHub auth with repo scope
          signIn('github', { callbackUrl: window.location.href });
          return;
        }
      }

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoName: repoName.trim(),
          description: description.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'فشل النشر');
      }

      setDeploymentSuccess(true);
      setRepoUrl(data.repoUrl);
      setPageUrl(data.pageUrl);

      toast({
        title: "تم نشر الموقع بنجاح",
        description: "موقعك متاح الآن على GitHub Pages",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Trigger a reload of the dashboard to update the UI with the new deployed URL
      // This is done by simply navigating to the same page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Deployment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      
      toast({
        title: "فشل النشر",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      // Reset form state if modal is closed
      if (deploymentSuccess) {
        setRepoName(`${userName}-portfolio`);
        setDescription(`Portfolio website for ${userName}`);
        setDeploymentSuccess(false);
        setRepoUrl('');
        setPageUrl('');
      }
      setError('');
      onClose();
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center">
          <FaGithub style={{ marginRight: '8px' }} />
          نشر الموقع على GitHub Pages
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {deploymentSuccess ? (
            <VStack spacing={6} align="stretch">
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                py={4}
                borderRadius="md"
              >
                <FaCheckCircle size={28} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  تم النشر بنجاح!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  تم نشر موقعك على GitHub Pages.
                </AlertDescription>
              </Alert>
              
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <VStack spacing={4} align="start">
                  <Box width="100%">
                    <Text fontWeight="bold" mb={1}>مستودع GitHub:</Text>
                    <HStack>
                      <Link href={repoUrl} isExternal color="blue.500" fontWeight="medium">
                        {repoUrl.replace('https://github.com/', '')}
                      </Link>
                      <FaExternalLinkAlt size={14} color="gray" />
                    </HStack>
                  </Box>
                  
                  <Divider />
                  
                  <Box width="100%">
                    <Text fontWeight="bold" mb={1}>رابط الموقع المباشر:</Text>
                    <HStack>
                      <Link href={pageUrl} isExternal color="blue.500" fontWeight="medium">
                        {pageUrl}
                      </Link>
                      <FaExternalLinkAlt size={14} color="gray" />
                    </HStack>
                  </Box>
                </VStack>
              </Box>
              
              <Text fontSize="sm" color="gray.500">
                ملاحظة: قد يستغرق GitHub Pages بضع دقائق لنشر موقعك بالكامل. إذا لم يعمل الرابط المباشر على الفور، يرجى التحقق مرة أخرى بعد بضع دقائق.
              </Text>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              <Text>
                انشر موقعك على GitHub Pages لمشاركته مع العالم. سيؤدي هذا إلى إنشاء مستودع في حساب GitHub الخاص بك ونشر موقع البورتفوليو الخاص بك.
              </Text>
              
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <AlertTitle mr={2}>خطأ في النشر</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {tokenStatus && !tokenStatus.isValid && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon as={FaInfoCircle} />
                  <Box>
                    <AlertTitle>تصريح GitHub مطلوب</AlertTitle>
                    <AlertDescription>
                      {tokenStatus.message}
                    </AlertDescription>
                  </Box>
                </Alert>
              )}
              
              <FormControl isRequired>
                <FormLabel>اسم المستودع</FormLabel>
                <Input 
                  value={repoName} 
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="your-portfolio" 
                  isDisabled={isLoading}
                />
                <FormHelperText>
                  سيؤدي هذا إلى إنشاء مستودع باسم {repoName} في حساب GitHub الخاص بك
                </FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>وصف المستودع</FormLabel>
                <Input 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="موقع بورتفوليو احترافي" 
                  isDisabled={isLoading}
                />
              </FormControl>
              
              <Text fontSize="sm" color="gray.500">
                سيكون موقعك متاحًا على: <Text as="span" fontWeight="bold">
                  https://{userName}.github.io/{repoName}
                </Text>
              </Text>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {deploymentSuccess ? (
            <Button colorScheme="blue" onClick={handleClose}>
              إغلاق
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={handleClose} isDisabled={isLoading} mr={3}>
                إلغاء
              </Button>
              <Button 
                colorScheme="blue" 
                leftIcon={isLoading ? <Spinner size="sm" /> : <FaGithub />}
                onClick={handleDeploy}
                isLoading={isLoading}
                loadingText="جاري النشر..."
              >
                {tokenStatus?.isValid ? 'نشر على GitHub' : 'الموافقة والنشر'}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeployModal;
