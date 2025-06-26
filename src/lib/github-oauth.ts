import { Octokit } from '@octokit/rest';
import { Session } from 'next-auth';

/**
 * Check if the GitHub token is valid and has the required scopes
 * @param token GitHub OAuth token
 * @returns Boolean indicating if token is valid
 */
export async function validateGitHubToken(token: string): Promise<boolean> {
  if (!token) return false;

  try {
    const octokit = new Octokit({ auth: token });
    
    // Check if token is valid by getting user info
    const { data: user } = await octokit.users.getAuthenticated();
    
    if (!user || !user.login) return false;

    // Check permissions by trying to get a list of repos (requires 'repo' scope)
    await octokit.repos.listForAuthenticatedUser({ per_page: 1 });
    
    return true;
  } catch (error) {
    console.error('GitHub token validation error:', error);
    return false;
  }
}

/**
 * Check if the session has a valid GitHub token, and prompt for reauthentication if needed
 * @param session User session
 * @returns Object with token status and message
 */
export async function checkGitHubTokenStatus(session: Session | null): Promise<{ 
  isValid: boolean; 
  message: string;
  needsReauth: boolean;
}> {
  if (!session?.user) {
    return {
      isValid: false,
      message: 'غير مسجل الدخول',
      needsReauth: true
    };
  }

  if (!session.user.github_token) {
    return {
      isValid: false,
      message: 'رمز GitHub غير موجود، يرجى إعادة تسجيل الدخول',
      needsReauth: true
    };
  }

  const isValid = await validateGitHubToken(session.user.github_token);
  
  if (!isValid) {
    return {
      isValid: false,
      message: 'انتهت صلاحية رمز GitHub أو أنه غير صالح، يرجى إعادة تسجيل الدخول',
      needsReauth: true
    };
  }

  return {
    isValid: true,
    message: 'رمز GitHub صالح',
    needsReauth: false
  };
}

/**
 * Get a user's public GitHub repositories
 * @param username GitHub username
 * @param token GitHub OAuth token (optional)
 * @returns Array of repositories
 */
export async function getUserRepositories(username: string, token?: string) {
  try {
    const octokit = new Octokit(token ? { auth: token } : {});
    
    const { data: repositories } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
      type: 'owner',
    });
    
    return repositories;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw new Error('فشل في جلب مستودعات GitHub');
  }
}
