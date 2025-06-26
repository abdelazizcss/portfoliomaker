'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { GitHubRepo } from '@/types';
import { supabase } from '@/lib/supabase';

/**
 * Fetch user repositories from GitHub
 * @param username GitHub username
 * @returns Array of repositories
 */
export async function fetchGitHubRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    
    // GitHub API URL for user repositories
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    
    // Use GitHub token if available for higher rate limits
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (process.env.GITHUB_API_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_API_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Map GitHub API response to our interface
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description || '',
      homepage: repo.homepage || '',
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      default_branch: repo.default_branch,
      private: repo.private || false,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

/**
 * Import a GitHub repository as a project
 * @param repoId Repository ID to import
 * @returns Created project
 */
export async function importGitHubRepository(repoFullName: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    
    // Fetch repository details from GitHub
    const url = `https://api.github.com/repos/${repoFullName}`;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (process.env.GITHUB_API_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_API_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repo = await response.json();
    
    // Format the project data
    const projectData = {
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description available',
      github_link: repo.html_url,
      demo_link: repo.homepage || '',
      technologies: [...(repo.topics || [])],
      status: 'completed',
      category: determineCategory(repo.language, repo.topics),
    };
    
    if (repo.language && !projectData.technologies.includes(repo.language)) {
      projectData.technologies.push(repo.language);
    }
    
    // Since this is a server component, we need to create the project directly
    // instead of making an API call to our own endpoint
    try {
      // Check if Supabase is available
      if (!supabase) {
        throw new Error('Database not configured');
      }

      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('github_id', session.user.id)
        .single();

      if (!user) {
        throw new Error('User not found in database. Please complete your profile first.');
      }

      // Prepare the project data with user ID
      const fullProjectData = {
        ...projectData,
        user_id: user.id,
      };      // Insert directly into the database
      const { data, error } = await supabase
        .from('projects')
        .insert(fullProjectData)
        .select()
        .single();
        
      if (error) {
        console.error('Error creating project:', error);
        
        // Check for RLS issues
        if (error.message.includes('permission denied') || error.code === '42501') {
          throw new Error('Database permission error: Row Level Security is blocking access. Try disabling RLS on projects table.');
        }
        
        // Check for missing table
        if (error.code === '42P01') {
          throw new Error('The projects table does not exist. Run the setup SQL script first.');
        }
        
        throw new Error(`Failed to create project: ${error.message}`);
      }
      
      return data;
    } catch (dbError: any) {
      console.error('Database operation error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Error importing GitHub repository:', error);
    throw error;
  }
}

/**
 * Determine the project category based on language and topics
 */
function determineCategory(language: string, topics: string[]): string {
  const topicsStr = topics.join(' ').toLowerCase();
  
  if (
    topicsStr.includes('react-native') || 
    topicsStr.includes('android') || 
    topicsStr.includes('ios') || 
    topicsStr.includes('flutter') || 
    topicsStr.includes('mobile')
  ) {
    return 'Mobile App';
  }
  
  if (
    topicsStr.includes('api') || 
    topicsStr.includes('backend') || 
    topicsStr.includes('server')
  ) {
    return 'API/Backend';
  }
  
  if (
    topicsStr.includes('machine-learning') || 
    topicsStr.includes('ai') || 
    topicsStr.includes('ml') || 
    topicsStr.includes('data-science')
  ) {
    return 'Machine Learning';
  }
  
  if (
    language === 'JavaScript' || 
    language === 'TypeScript' || 
    topicsStr.includes('react') || 
    topicsStr.includes('vue') || 
    topicsStr.includes('angular') ||
    topicsStr.includes('next') ||
    topicsStr.includes('web')
  ) {
    return 'Web Development';
  }
  
  return 'Other';
}
