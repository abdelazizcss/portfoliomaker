import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { GitHubProfile } from '@/types';

// Temporary: Comment out Supabase until it's configured
// import { supabaseAdmin } from '@/lib/supabase';
// const supabase = supabaseAdmin;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          // توسيع النطاق ليشمل صلاحيات لإنشاء وتحديث المستودعات
          scope: 'read:user user:email repo',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' && profile) {
        try {
          const githubProfile = profile as GitHubProfile;
          
          // TODO: Add Supabase integration here later
          console.log('User signed in:', {
            name: user.name,
            email: user.email,
            github_username: githubProfile.login,
            github_url: githubProfile.html_url,
          });

          return true;
        } catch (error) {
          console.error('SignIn error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        // Add GitHub user data from token
        session.user = {
          ...session.user,
          id: token.github_id || token.sub,
          github_username: token.github_username as string || session.user.name || 'user',
          github_token: token.github_token as string || undefined,
        };
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Store GitHub user data in JWT token
      if (account?.provider === 'github' && profile) {
        const githubProfile = profile as GitHubProfile;
        token.github_username = githubProfile.login;
        token.github_id = githubProfile.id.toString();
        // Use GitHub ID as the main ID
        token.sub = githubProfile.id.toString();
        
        // Store access token for API calls
        if (account.access_token) {
          token.github_token = account.access_token;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
};
