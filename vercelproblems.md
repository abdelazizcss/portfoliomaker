[18:53:00.273] Running build in Washington, D.C., USA (East) – iad1
[18:53:00.274] Build machine configuration: 2 cores, 8 GB
[18:53:00.290] Cloning github.com/abdelazizcss/portfoliomaker (Branch: main, Commit: de2707b)
[18:53:00.496] Previous build caches not available
[18:53:00.560] Cloning completed: 270.000ms
[18:53:01.026] Running "vercel build"
[18:53:01.468] Vercel CLI 43.3.0
[18:53:01.779] Running "install" command: `npm install`...
[18:53:16.271] 
[18:53:16.271] added 437 packages, and audited 438 packages in 14s
[18:53:16.272] 
[18:53:16.272] 141 packages are looking for funding
[18:53:16.272]   run `npm fund` for details
[18:53:16.273] 
[18:53:16.274] found 0 vulnerabilities
[18:53:16.321] Detected Next.js version: 15.3.4
[18:53:16.322] Running "npm run build"
[18:53:16.444] 
[18:53:16.444] > portfolio-app@0.1.0 build
[18:53:16.444] > next build
[18:53:16.444] 
[18:53:17.063]  ⚠ Invalid next.config.ts options detected: 
[18:53:17.064]  ⚠     Unrecognized key(s) in object: 'swcMinify'
[18:53:17.064]  ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
[18:53:17.076] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[18:53:17.076] This information is used to shape Next.js' roadmap and prioritize features.
[18:53:17.076] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[18:53:17.076] https://nextjs.org/telemetry
[18:53:17.077] 
[18:53:17.183]    ▲ Next.js 15.3.4
[18:53:17.183] 
[18:53:17.215]    Creating an optimized production build ...
[18:53:45.715]  ✓ Compiled successfully in 24.0s
[18:53:45.720]    Linting and checking validity of types ...
[18:53:53.066] 
[18:53:53.067] Failed to compile.
[18:53:53.067] 
[18:53:53.067] ./src/app/api/deploy/route.ts
[18:53:53.068] 95:27  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.068] 
[18:53:53.068] ./src/app/api/github/route.ts
[18:53:53.068] 25:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.068] 52:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.068] 
[18:53:53.069] ./src/app/api/projects/route.ts
[18:53:53.069] 322:39  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.069] 391:39  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.069] 
[18:53:53.069] ./src/app/api/upload/route.ts
[18:53:53.070] 62:13  Error: 'data' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.070] 
[18:53:53.070] ./src/app/api/user/route.ts
[18:53:53.070] 5:24  Error: 'UserProfile' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.072] 7:27  Error: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.072] 
[18:53:53.072] ./src/app/auth/error/page.tsx
[18:53:53.072] 8:3  Error: 'Text' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.072] 21:9  Error: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.073] 
[18:53:53.073] ./src/app/dashboard/page.tsx
[18:53:53.073] 28:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.075] 54:8  Error: 'NextLink' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.075] 191:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.075] 226:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.075] 752:19  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
[18:53:53.075] 752:43  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
[18:53:53.076] 
[18:53:53.083] ./src/app/page-old.tsx
[18:53:53.083] 16:3  Error: 'Flex' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.084] 17:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.084] 
[18:53:53.084] ./src/app/page.tsx
[18:53:53.084] 106:24  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.084] 
[18:53:53.085] ./src/app/portfolio/[username]/page-backup.tsx
[18:53:53.085] 19:11  Error: 'ChakraLink' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.085] 33:3  Error: 'Tabs' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.085] 34:3  Error: 'TabList' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.086] 35:3  Error: 'Tab' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.086] 36:3  Error: 'TabPanels' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.086] 37:3  Error: 'TabPanel' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.086] 39:3  Error: 'useColorMode' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.086] 43:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.087] 45:3  Error: 'Progress' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.087] 48:3  Error: 'useTheme' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.087] 65:3  Error: 'FaStar' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.090] 68:3  Error: 'FaGraduationCap' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.093] 69:3  Error: 'FaCertificate' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.094] 70:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.094] 71:3  Error: 'FaAward' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.094] 72:3  Error: 'FaUsers' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.094] 75:3  Error: 'FaQuoteLeft' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.094] 88:38  Error: 'params' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.095] 124:9  Error: 'isDesktop' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.095] 231:57  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.095] 231:78  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.095] 681:27  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.095] 690:32  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.095] 745:33  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.097] 751:42  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.097] 756:35  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.098] 779:44  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.098] 821:27  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.098] 830:32  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.098] 889:53  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.099] 1037:39  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.099] 1260:15  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.099] 1316:19  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.099] 1318:21  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.100] 1334:25  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.100] 1344:27  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.100] 1416:29  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.100] 1437:33  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.100] 1444:35  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.101] 1471:39  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.101] 
[18:53:53.101] ./src/app/portfolio/[username]/page-modern.tsx
[18:53:53.101] 16:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.102] 24:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.102] 25:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.102] 27:3  Error: 'Modal' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.102] 28:3  Error: 'ModalOverlay' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.102] 29:3  Error: 'ModalContent' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 30:3  Error: 'ModalHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 31:3  Error: 'ModalBody' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 32:3  Error: 'ModalCloseButton' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 37:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 40:3  Error: 'Icon' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.103] 53:3  Error: 'FaUser' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.104] 57:3  Error: 'FaCalendarAlt' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.104] 61:10  Error: 'useParams' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.104] 119:6  Warning: React Hook useEffect has missing dependencies: 'colorMode' and 'toggleColorMode'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps
[18:53:53.104] 228:13  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.104] 439:23  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.105] 522:31  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.105] 528:40  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.105] 657:22  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.105] 699:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.105] 
[18:53:53.105] ./src/app/portfolio/[username]/page-new.tsx
[18:53:53.106] 11:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 23:3  Error: 'WrapItem' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 24:3  Error: 'Flex' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 33:3  Error: 'Tabs' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 34:3  Error: 'TabList' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 35:3  Error: 'Tab' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 36:3  Error: 'TabPanels' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.106] 37:3  Error: 'TabPanel' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 43:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 59:3  Error: 'FaBriefcase' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 62:3  Error: 'FaQuoteLeft' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 70:3  Error: 'FaGraduationCap' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 71:3  Error: 'FaAward' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 72:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.107] 89:10  Error: 'activeTab' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.108] 89:21  Error: 'setActiveTab' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.108] 101:9  Error: 'borderColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.108] 104:9  Error: 'headerBg' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.108] 105:9  Error: 'shadowColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.108] 192:34  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.108] 192:55  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.109] 606:37  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.109] 611:58  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.109] 773:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.109] 
[18:53:53.109] ./src/app/portfolio/[username]/page-professional.tsx
[18:53:53.109] 11:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.109] 19:11  Error: 'ChakraLink' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 20:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 24:3  Error: 'Flex' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 33:3  Error: 'Tabs' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 34:3  Error: 'TabList' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 35:3  Error: 'Tab' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 36:3  Error: 'TabPanels' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.110] 37:3  Error: 'TabPanel' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.111] 39:3  Error: 'useColorMode' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.111] 43:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 45:3  Error: 'Progress' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 48:3  Error: 'useTheme' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 65:3  Error: 'FaStar' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 68:3  Error: 'FaGraduationCap' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 69:3  Error: 'FaCertificate' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.114] 70:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.115] 71:3  Error: 'FaAward' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.115] 72:3  Error: 'FaUsers' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.115] 73:3  Error: 'FaLightbulb' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.115] 74:3  Error: 'FaChevronDown' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.115] 75:3  Error: 'FaQuoteLeft' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.116] 88:38  Error: 'params' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.116] 111:9  Error: 'isDesktop' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.116] 156:9  Error: 'getPlatformColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.116] 207:57  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.116] 207:78  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.116] 464:33  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.117] 470:42  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.117] 
[18:53:53.117] ./src/app/portfolio/[username]/page.tsx
[18:53:53.123] 16:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 24:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 25:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 27:3  Error: 'Modal' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 28:3  Error: 'ModalOverlay' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 29:3  Error: 'ModalContent' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 30:3  Error: 'ModalHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.124] 31:3  Error: 'ModalBody' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 32:3  Error: 'ModalCloseButton' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 37:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 52:3  Error: 'FaUser' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 56:3  Error: 'FaCalendarAlt' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 64:10  Error: 'useParams' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.125] 207:35  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.126] 268:13  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.126] 471:23  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.126] 554:31  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.126] 560:40  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[18:53:53.126] 689:22  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.133] 740:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[18:53:53.134] 
[18:53:53.134] ./src/components/GitHubSync.tsx
[18:53:53.134] 10:3  Error: 'Heading' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.134] 13:3  Error: 'CardHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.135] 19:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.135] 44:3  Error: 'FaCodeBranch' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.135] 45:3  Error: 'FaPlus' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.135] 46:3  Error: 'FaTimes' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.135] 78:6  Warning: React Hook useEffect has a missing dependency: 'fetchRepositories'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[18:53:53.136] 127:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.136] 179:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.136] 269:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.136] 
[18:53:53.136] ./src/components/ProfileEditModal.tsx
[18:53:53.136] 57:3  Error: 'FaTimes' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.137] 60:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.137] 62:3  Error: 'FaDownload' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.137] 63:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.137] 64:3  Error: 'FaUniversity' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.137] 121:10  Error: 'cvFile' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.138] 315:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.138] 580:100  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[18:53:53.138] 
[18:53:53.138] ./src/components/ProjectModal-Fixed.tsx
[18:53:53.138] 39:3  Error: 'Checkbox' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.139] 41:3  Error: 'Spinner' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.139] 42:3  Error: 'Alert' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.139] 43:3  Error: 'AlertIcon' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.139] 44:3  Error: 'Badge' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.140] 45:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 46:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 47:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 48:3  Error: 'Collapse' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 49:3  Error: 'InputRightElement' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 58:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.141] 60:3  Error: 'FaInfoCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.142] 169:17  Error: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.142] 192:10  Error: 'showAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.142] 192:31  Error: 'setShowAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.142] 221:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.142] 313:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.143] 325:9  Error: 'getStatusColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.143] 
[18:53:53.143] ./src/components/ProjectModal-Modern.tsx
[18:53:53.143] 21:3  Error: 'IconButton' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.143] 
[18:53:53.144] ./src/components/ProjectModal.tsx
[18:53:53.144] 39:3  Error: 'Checkbox' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.144] 41:3  Error: 'Spinner' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.144] 42:3  Error: 'Alert' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.144] 43:3  Error: 'AlertIcon' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 44:3  Error: 'Badge' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 45:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 46:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 47:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 48:3  Error: 'Collapse' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 49:3  Error: 'InputRightElement' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.145] 58:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 60:3  Error: 'FaInfoCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 169:17  Error: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 192:10  Error: 'showAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 192:31  Error: 'setShowAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 221:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.146] 313:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.146] 325:9  Error: 'getStatusColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[18:53:53.147] 
[18:53:53.147] ./src/lib/api.ts
[18:53:53.147] 2:10  Error: 'UserProfile' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.147] 328:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.147] 
[18:53:53.147] ./src/lib/github-deploy.ts
[18:53:53.147] 29:3  Error: 'projects' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.148] 65:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.148] 114:38  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 126:38  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 139:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 
[18:53:53.150] ./src/lib/github.ts
[18:53:53.150] 42:29  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 155:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 
[18:53:53.150] ./src/middleware.ts
[18:53:53.150] 4:23  Error: 'req' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.150] 
[18:53:53.150] ./src/theme/index-fixed.ts
[18:53:53.150] 192:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 
[18:53:53.150] ./src/theme/index.ts
[18:53:53.150] 192:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.150] 
[18:53:53.150] ./src/types/index.ts
[18:53:53.150] 2:10  Error: 'JWT' is defined but never used.  @typescript-eslint/no-unused-vars
[18:53:53.151] 111:35  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[18:53:53.151] 
[18:53:53.151] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[18:53:53.152] Error: Command "npm run build" exited with 1
[18:53:53.355] 
[18:53:56.329] Exiting build container