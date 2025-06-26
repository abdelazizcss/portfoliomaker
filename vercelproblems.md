[19:29:32.693] Running build in Washington, D.C., USA (East) – iad1
[19:29:32.694] Build machine configuration: 2 cores, 8 GB
[19:29:32.710] Cloning github.com/abdelazizcss/portfoliomaker (Branch: main, Commit: 5bc0f52)
[19:29:32.884] Previous build caches not available
[19:29:32.983] Cloning completed: 273.000ms
[19:29:33.042] Found .vercelignore
[19:29:33.062] Removed 50 ignored files defined in .vercelignore
[19:29:33.062]   /add_deployed_url_field.sql
[19:29:33.062]   /add_github_token.sql
[19:29:33.062]   /ALL_FIELDS_GUIDE.md
[19:29:33.062]   /check_database_compatibility.js
[19:29:33.062]   /check_database.js
[19:29:33.062]   /create_tables.sql
[19:29:33.062]   /DATABASE_UPDATE_GUIDE_AR.md
[19:29:33.062]   /debug_users_table.sql
[19:29:33.062]   /debug-app.js
[19:29:33.063]   /DEPLOY_GUIDE_AR.md
[19:29:33.356] Running "vercel build"
[19:29:33.816] Vercel CLI 43.3.0
[19:29:34.116] Running "install" command: `npm install`...
[19:29:48.362] 
[19:29:48.363] added 437 packages, and audited 438 packages in 14s
[19:29:48.363] 
[19:29:48.363] 141 packages are looking for funding
[19:29:48.363]   run `npm fund` for details
[19:29:48.364] 
[19:29:48.364] found 0 vulnerabilities
[19:29:48.405] Detected Next.js version: 15.3.4
[19:29:48.406] Running "npm run build:vercel"
[19:29:48.576] 
[19:29:48.576] > portfolio-app@0.1.0 build:vercel
[19:29:48.576] > NEXT_DISABLE_ESLINT=1 next build
[19:29:48.577] 
[19:29:49.178] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[19:29:49.179] This information is used to shape Next.js' roadmap and prioritize features.
[19:29:49.180] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[19:29:49.180] https://nextjs.org/telemetry
[19:29:49.180] 
[19:29:49.284]    ▲ Next.js 15.3.4
[19:29:49.285] 
[19:29:49.312]    Creating an optimized production build ...
[19:30:17.071]  ✓ Compiled successfully in 24.0s
[19:30:17.094]    Linting and checking validity of types ...
[19:30:24.115] 
[19:30:24.116] Failed to compile.
[19:30:24.122] 
[19:30:24.122] ./src/app/api/deploy/route.ts
[19:30:24.122] 95:27  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.122] 
[19:30:24.123] ./src/app/api/github/route.ts
[19:30:24.123] 25:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.123] 52:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.123] 
[19:30:24.123] ./src/app/api/projects/route.ts
[19:30:24.123] 322:39  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.123] 391:39  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.123] 
[19:30:24.124] ./src/app/api/upload/route.ts
[19:30:24.124] 62:13  Error: 'data' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.124] 
[19:30:24.124] ./src/app/api/user/route.ts
[19:30:24.124] 5:24  Error: 'UserProfile' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.124] 7:27  Error: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.124] 
[19:30:24.124] ./src/app/auth/error/page.tsx
[19:30:24.124] 8:3  Error: 'Text' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.124] 21:9  Error: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.124] 
[19:30:24.124] ./src/app/dashboard/page.tsx
[19:30:24.125] 28:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.125] 54:8  Error: 'NextLink' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.125] 191:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.125] 226:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.125] 752:19  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
[19:30:24.125] 752:43  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
[19:30:24.125] 
[19:30:24.128] ./src/app/page.tsx
[19:30:24.128] 106:24  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.128] 
[19:30:24.128] ./src/app/portfolio/[username]/page-modern.tsx
[19:30:24.128] 16:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.128] 24:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.128] 25:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.128] 27:3  Error: 'Modal' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.128] 28:3  Error: 'ModalOverlay' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 29:3  Error: 'ModalContent' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 30:3  Error: 'ModalHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 31:3  Error: 'ModalBody' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 32:3  Error: 'ModalCloseButton' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 37:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 40:3  Error: 'Icon' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 53:3  Error: 'FaUser' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 57:3  Error: 'FaCalendarAlt' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 61:10  Error: 'useParams' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.129] 119:6  Warning: React Hook useEffect has missing dependencies: 'colorMode' and 'toggleColorMode'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps
[19:30:24.137] 228:13  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.137] 439:23  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.137] 522:31  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.137] 528:40  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.138] 657:22  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.138] 699:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.138] 
[19:30:24.138] ./src/app/portfolio/[username]/page-new.tsx
[19:30:24.138] 11:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.140] 23:3  Error: 'WrapItem' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.140] 24:3  Error: 'Flex' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.140] 33:3  Error: 'Tabs' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.141] 34:3  Error: 'TabList' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.141] 35:3  Error: 'Tab' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.141] 36:3  Error: 'TabPanels' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.141] 37:3  Error: 'TabPanel' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.141] 43:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.142] 59:3  Error: 'FaBriefcase' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.142] 62:3  Error: 'FaQuoteLeft' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.143] 70:3  Error: 'FaGraduationCap' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.143] 71:3  Error: 'FaAward' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.143] 72:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.143] 89:10  Error: 'activeTab' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.143] 89:21  Error: 'setActiveTab' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.144] 101:9  Error: 'borderColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.144] 104:9  Error: 'headerBg' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.144] 105:9  Error: 'shadowColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.144] 192:34  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.144] 192:55  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.145] 606:37  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.145] 611:58  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.145] 773:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.145] 
[19:30:24.145] ./src/app/portfolio/[username]/page-professional.tsx
[19:30:24.146] 11:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 19:11  Error: 'ChakraLink' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 20:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 24:3  Error: 'Flex' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 33:3  Error: 'Tabs' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 34:3  Error: 'TabList' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.146] 35:3  Error: 'Tab' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 36:3  Error: 'TabPanels' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 37:3  Error: 'TabPanel' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 39:3  Error: 'useColorMode' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 43:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 45:3  Error: 'Progress' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 48:3  Error: 'useTheme' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.147] 65:3  Error: 'FaStar' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.148] 68:3  Error: 'FaGraduationCap' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.148] 69:3  Error: 'FaCertificate' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.148] 70:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.148] 71:3  Error: 'FaAward' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.148] 72:3  Error: 'FaUsers' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 73:3  Error: 'FaLightbulb' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 74:3  Error: 'FaChevronDown' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 75:3  Error: 'FaQuoteLeft' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 88:38  Error: 'params' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 111:9  Error: 'isDesktop' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 156:9  Error: 'getPlatformColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.149] 207:57  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.149] 207:78  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.150] 464:33  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.150] 470:42  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.150] 
[19:30:24.150] ./src/app/portfolio/[username]/page.tsx
[19:30:24.150] 16:3  Error: 'GridItem' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.150] 24:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.150] 25:3  Error: 'Stack' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.151] 27:3  Error: 'Modal' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.151] 28:3  Error: 'ModalOverlay' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.151] 29:3  Error: 'ModalContent' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.151] 30:3  Error: 'ModalHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.160] 31:3  Error: 'ModalBody' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.160] 32:3  Error: 'ModalCloseButton' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.160] 37:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.160] 52:3  Error: 'FaUser' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.161] 56:3  Error: 'FaCalendarAlt' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.161] 64:10  Error: 'useParams' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.161] 207:35  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.161] 268:13  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.161] 471:23  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.161] 554:31  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.161] 560:40  Error: React Hook "useColorModeValue" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
[19:30:24.162] 689:22  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.162] 740:16  Error: React Hook "useColorModeValue" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks
[19:30:24.162] 
[19:30:24.162] ./src/components/GitHubSync.tsx
[19:30:24.162] 10:3  Error: 'Heading' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.162] 13:3  Error: 'CardHeader' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.162] 19:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.163] 44:3  Error: 'FaCodeBranch' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.163] 45:3  Error: 'FaPlus' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.163] 46:3  Error: 'FaTimes' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.163] 78:6  Warning: React Hook useEffect has a missing dependency: 'fetchRepositories'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
[19:30:24.163] 127:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.163] 179:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.163] 269:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.164] 
[19:30:24.164] ./src/components/ProfileEditModal.tsx
[19:30:24.164] 57:3  Error: 'FaTimes' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.164] 60:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.164] 62:3  Error: 'FaDownload' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.164] 63:3  Error: 'FaLanguage' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.165] 64:3  Error: 'FaUniversity' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.165] 121:10  Error: 'cvFile' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.165] 315:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.166] 580:100  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[19:30:24.166] 
[19:30:24.166] ./src/components/ProjectModal-Fixed.tsx
[19:30:24.166] 39:3  Error: 'Checkbox' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.166] 41:3  Error: 'Spinner' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.166] 42:3  Error: 'Alert' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.167] 43:3  Error: 'AlertIcon' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.167] 44:3  Error: 'Badge' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.167] 45:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.168] 46:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.168] 47:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.169] 48:3  Error: 'Collapse' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.169] 49:3  Error: 'InputRightElement' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 58:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 60:3  Error: 'FaInfoCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 169:17  Error: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 192:10  Error: 'showAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 192:31  Error: 'setShowAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.170] 221:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.171] 313:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.171] 325:9  Error: 'getStatusColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.171] 
[19:30:24.171] ./src/components/ProjectModal-Modern.tsx
[19:30:24.171] 21:3  Error: 'IconButton' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.171] 
[19:30:24.172] ./src/components/ProjectModal.tsx
[19:30:24.172] 39:3  Error: 'Checkbox' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.172] 41:3  Error: 'Spinner' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.172] 42:3  Error: 'Alert' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.173] 43:3  Error: 'AlertIcon' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.173] 44:3  Error: 'Badge' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.173] 45:3  Error: 'Divider' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.173] 46:3  Error: 'Tooltip' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.174] 47:3  Error: 'Switch' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.175] 48:3  Error: 'Collapse' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.175] 49:3  Error: 'InputRightElement' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.175] 58:3  Error: 'FaCheckCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.175] 60:3  Error: 'FaInfoCircle' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 169:17  Error: 'session' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 192:10  Error: 'showAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 192:31  Error: 'setShowAdvancedOptions' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 221:59  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.176] 313:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 325:9  Error: 'getStatusColor' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[19:30:24.176] 
[19:30:24.176] ./src/lib/api.ts
[19:30:24.177] 2:10  Error: 'UserProfile' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.177] 328:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.177] 
[19:30:24.177] ./src/lib/github-deploy.ts
[19:30:24.177] 29:3  Error: 'projects' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.177] 65:14  Error: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.177] 114:38  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.178] 126:38  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.178] 139:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.178] 
[19:30:24.178] ./src/lib/github.ts
[19:30:24.179] 42:29  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.179] 155:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.179] 
[19:30:24.180] ./src/middleware.ts
[19:30:24.180] 4:23  Error: 'req' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.180] 
[19:30:24.180] ./src/theme/index-fixed.ts
[19:30:24.181] 192:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.181] 
[19:30:24.181] ./src/theme/index.ts
[19:30:24.181] 192:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.181] 
[19:30:24.182] ./src/types/index.ts
[19:30:24.182] 2:10  Error: 'JWT' is defined but never used.  @typescript-eslint/no-unused-vars
[19:30:24.182] 111:35  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[19:30:24.182] 
[19:30:24.182] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[19:30:24.189] Error: Command "npm run build:vercel" exited with 1
[19:30:24.448] 
[19:30:27.971] Exiting build container