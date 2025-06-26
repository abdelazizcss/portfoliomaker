// API service functions for Portfolio Maker
import { UserProfile, Project, DatabaseUser, GitHubRepo } from '@/types';

const API_BASE = '/api';

// User API functions
export const userAPI = {
  // Get current user profile
  getProfile: async (): Promise<DatabaseUser | null> => {
    try {
      const response = await fetch(`${API_BASE}/user`);
      if (!response.ok) {
        if (response.status === 401) return null;
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Save/Update user profile
  saveProfile: async (profileData: Partial<DatabaseUser>): Promise<DatabaseUser> => {
    try {
      // Make sure the required fields are not empty
      const validatedProfileData = {
        ...profileData,
        name: profileData.name || 'User',
        email: profileData.email || 'user@example.com',
      };
      
      const response = await fetch(`${API_BASE}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedProfileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        const errorDetails = errorData.details ? ` Details: ${errorData.details}` : '';
        console.error('Save profile error:', errorMessage, errorDetails);
        
        if (errorData.details && errorData.details.includes('Row Level Security')) {
          throw new Error(`Failed to save profile: Database permission error. RLS might be blocking access.`);
        }
        
        throw new Error(`Failed to save profile: ${errorMessage}${errorDetails}`);
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },

  // Get user profile by username
  getProfileByUsername: async (username: string): Promise<DatabaseUser | null> => {
    try {
      const response = await fetch(`${API_BASE}/user?username=${username}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching profile by username:', error);
      throw error;
    }
  },
};

// Projects API functions
export const projectsAPI = {
  // Get user's projects
  getProjects: async (userId?: string): Promise<Project[]> => {
    try {
      const url = userId ? `${API_BASE}/projects?userId=${userId}` : `${API_BASE}/projects`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      // Handle both array response and { projects: [] } response format
      return Array.isArray(data) ? data : data.projects || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get projects by username
  getProjectsByUsername: async (username: string): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_BASE}/projects?username=${username}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      // Handle both array response and { projects: [] } response format
      return Array.isArray(data) ? data : data.projects || [];
    } catch (error) {
      console.error('Error fetching projects by username:', error);
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Project> => {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        const errorDetails = errorData.details ? ` Details: ${errorData.details}` : '';
        
        console.error('Error creating project:', errorMessage, errorDetails);
        
        if (errorData.details && errorData.details.includes('Row Level Security')) {
          throw new Error(`Failed to create project: Database permission error. RLS might be blocking access.`);
        }
        
        throw new Error(`Failed to create project: ${errorMessage}${errorDetails}`);
      }

      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update project
  updateProject: async (projectData: Project): Promise<Project> => {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (projectId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/projects?id=${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};

// Upload API functions
export const uploadAPI = {
  // Upload file
  uploadFile: async (file: File, type: 'avatar' | 'cv' | 'project'): Promise<{ url: string; fileName: string; filePath: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Delete file
  deleteFile: async (filePath: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/upload?path=${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
};

// File validation utilities
export const fileUtils = {
  validateImage: (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please select a valid image file (JPEG, PNG, or WebP)' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'Image size must be less than 5MB' };
    }

    return { valid: true };
  },

  validatePDF: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.type !== 'application/pdf') {
      return { valid: false, error: 'Please select a valid PDF file' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'PDF size must be less than 5MB' };
    }

    return { valid: true };
  },

  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

// GitHub API functions
export const githubAPI = {
  // Get user repositories from GitHub
  getRepositories: async (): Promise<GitHubRepo[]> => {
    try {
      const response = await fetch(`${API_BASE}/github`);
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      const data = await response.json();
      return data.repositories;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  },

  // Import a GitHub repository as a project
  importRepository: async (repoFullName: string): Promise<Project> => {
    try {
      const response = await fetch(`${API_BASE}/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoFullName }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(`Failed to import repository: ${errorMessage}`);
      }

      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error('Error importing GitHub repository:', error);
      throw error;
    }
  },
  
  // Sync multiple GitHub repositories at once
  syncRepositories: async (repoFullNames: string[]): Promise<Project[]> => {
    try {
      const projects: Project[] = [];
      const errors: { repo: string, error: string }[] = [];
      
      // Import repositories one by one to handle potential errors
      for (const repoFullName of repoFullNames) {
        try {
          const project = await githubAPI.importRepository(repoFullName);
          projects.push(project);
        } catch (error: any) {
          console.error(`Error importing ${repoFullName}:`, error);
          errors.push({ 
            repo: repoFullName, 
            error: error.message || 'Unknown error' 
          });
          // Continue with the next repository
        }
      }
      
      // If no projects were imported but there were errors, throw the first error
      if (projects.length === 0 && errors.length > 0) {
        throw new Error(`Failed to import any repositories. First error: ${errors[0].error}`);
      }
      
      // If some projects failed but others succeeded, log a warning but return the successful ones
      if (errors.length > 0) {
        console.warn(`Some repositories failed to import: ${errors.length} failures, ${projects.length} successes`);
      }
      
      return projects;
    } catch (error) {
      console.error('Error syncing GitHub repositories:', error);
      throw error;
    }
  }
};
