import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl;
        
        // Protect dashboard routes
        if (pathname.startsWith('/dashboard')) {
          return !!token;
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

// Update the matcher to include all protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/projects/:path*',
    '/api/user/:path*',
    '/api/upload/:path*',
    '/api/deploy/:path*',
  ],
};
