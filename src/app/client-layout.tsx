'use client';

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { Providers } from "@/components/Providers";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ChakraProvider theme={theme}>
      <Providers>
        {children}
      </Providers>
    </ChakraProvider>
  );
}
