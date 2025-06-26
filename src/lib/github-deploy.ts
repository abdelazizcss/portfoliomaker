import { Octokit } from '@octokit/rest';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { DatabaseUser, Project } from '@/types';

// Type for deployment parameters
interface DeployParams {
  user: DatabaseUser;
  repoName: string;
  description: string;
  htmlContent: string;
  projects: Project[];
}

// Type for deployment result
interface DeployResult {
  repoUrl: string;
  pageUrl: string;
}

/**
 * Deploy portfolio to GitHub Pages
 */
export async function deployToGitHub({
  user,
  repoName,
  description,
  htmlContent,
  projects
}: DeployParams): Promise<DeployResult> {
  // Get the GitHub session token
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  // Ensure we have a GitHub username
  if (!user.github_username) {
    throw new Error('GitHub username not found');
  }

  try {
    // Get GitHub token from the session or the database
    const githubToken = session.user.github_token || user.github_token;
    
    if (!githubToken) {
      throw new Error('GitHub token not found. Please sign out and sign in again to grant repository access permissions.');
    }

    // Initialize Octokit with the user's token
    const octokit = new Octokit({
      auth: githubToken
    });

    // Check if repository exists and create it if it doesn't
    try {
      await octokit.repos.get({
        owner: user.github_username,
        repo: repoName,
      });
      
      // Repository exists - we'll update it
      console.log(`Repository ${repoName} exists, updating...`);
    } catch (error) {
      // Repository doesn't exist - create it
      console.log(`Creating new repository: ${repoName}`);
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: description,
        private: false,
        auto_init: true,
        has_issues: false,
        has_projects: false,
        has_wiki: false,
      });
      
      // Wait a moment for the repository to be fully initialized
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Get the default branch (usually main or master)
    const { data: repoData } = await octokit.repos.get({
      owner: user.github_username,
      repo: repoName,
    });
    
    const defaultBranch = repoData.default_branch;

    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner: user.github_username,
      repo: repoName,
      ref: `heads/${defaultBranch}`,
    });
    
    const latestCommitSha = refData.object.sha;

    // Get the tree based on the latest commit
    const { data: treeData } = await octokit.git.getTree({
      owner: user.github_username,
      repo: repoName,
      tree_sha: latestCommitSha,
    });

    // Create or update index.html
    await octokit.repos.createOrUpdateFileContents({
      owner: user.github_username,
      repo: repoName,
      path: 'index.html',
      message: 'Update portfolio content',
      content: Buffer.from(htmlContent).toString('base64'),
      branch: defaultBranch,
      sha: treeData.tree.find((item: any) => item.path === 'index.html')?.sha,
    });

    // Create or update README.md
    const readmeContent = generateReadmeContent(user, repoName);
    await octokit.repos.createOrUpdateFileContents({
      owner: user.github_username,
      repo: repoName,
      path: 'README.md',
      message: 'Update README',
      content: Buffer.from(readmeContent).toString('base64'),
      branch: defaultBranch,
      sha: treeData.tree.find((item: any) => item.path === 'README.md')?.sha,
    });

    // Enable GitHub Pages if not already enabled
    try {
      await octokit.repos.createPagesSite({
        owner: user.github_username,
        repo: repoName,
        source: {
          branch: defaultBranch,
          path: '/',
        },
      });
    } catch (error: any) {
      // If Pages is already enabled, this might throw an error
      // We can ignore it as long as it's not a critical error
      console.log('Info: GitHub Pages setup status:', error.message);
    }

    // Return the URLs
    return {
      repoUrl: `https://github.com/${user.github_username}/${repoName}`,
      pageUrl: `https://${user.github_username}.github.io/${repoName}`,
    };
  } catch (error) {
    console.error('GitHub deployment error:', error);
    throw error;
  }
}

/**
 * Generate README.md content for the portfolio repository
 */
function generateReadmeContent(user: DatabaseUser, repoName: string): string {
  return `# ${user.name} - Portfolio Website

Welcome to my personal portfolio website! 🚀

## About

This is my professional portfolio showcasing my work, skills, and experience as ${user.job_title || 'a professional'}.

${user.bio ? `\n## About Me\n\n${user.bio}\n` : ''}

## 🌐 Live Website

Visit my portfolio: [${user.name} Portfolio](https://${user.github_username}.github.io/${repoName})

## 🛠️ Built With

- HTML5 & CSS3
- Responsive Design
- Modern Web Standards
- Generated using Portfolio Maker

## 📱 Features

- 📱 Fully responsive design
- 🎨 Clean and modern UI
- ⚡ Fast loading
- 🌙 Dark mode support
- 📧 Contact information
- 💼 Project showcase
${user.skills && user.skills.length > 0 ? '- 🔧 Skills showcase' : ''}
${user.cv_url ? '- 📄 CV/Resume download' : ''}

## 📞 Contact

${user.email ? `- Email: [${user.email}](mailto:${user.email})` : ''}
${user.linkedin ? `- LinkedIn: [Profile](${user.linkedin})` : ''}
${user.github_url || user.github_username ? `- GitHub: [Profile](${user.github_url || `https://github.com/${user.github_username}`})` : ''}
${user.website ? `- Website: [${user.website}](${user.website})` : ''}
${user.cv_url ? `- CV/Resume: [Download](${user.cv_url})` : ''}

## 🔄 Last Updated

${new Date().toLocaleDateString()}

---

*This portfolio was automatically generated and deployed using Portfolio Maker.*
`;
}

/**
 * Verify if a GitHub token is valid
 */
export async function verifyGitHubToken(token: string): Promise<boolean> {
  try {
    const octokit = new Octokit({
      auth: token
    });
    
    // Try to get user information to verify token
    const { data } = await octokit.users.getAuthenticated();
    return !!data.login;
  } catch (error) {
    console.error('GitHub token verification error:', error);
    return false;
  }
}