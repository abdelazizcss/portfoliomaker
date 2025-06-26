import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// GitHub Profile interface
export interface GitHubProfile {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}

// Extended User interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username?: string;
      github_username?: string;
      github_token?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    username?: string;
    github_username?: string;
    github_token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username?: string;
    github_username?: string;
    github_id?: string;
    github_token?: string;
  }
}

export interface Experience {
  id?: string;
  user_id?: string;
  title: string;
  organization: string; // More generic than 'company'
  start_date: string;
  end_date?: string;
  description?: string;
  type: 'work' | 'internship' | 'volunteer' | 'education' | 'freelance' | 'project';
  location?: string;
  created_at?: string;
  updated_at?: string;
}

// GitHub Repository interface
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  private?: boolean;
}

// Database User interface - Enhanced for all professions
export interface DatabaseUser {
  id: string;
  github_id: string;
  github_username: string;
  github_url?: string;
  github_token?: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  behance?: string;
  dribbble?: string;
  youtube?: string;
  facebook?: string;
  cv_url?: string;
  deployed_site_url?: string; // URL to deployed GitHub Pages site
  skills: string[];
  job_title?: string;
  field_of_work?: string; // e.g., 'Design', 'Marketing', 'Engineering', 'Medicine', etc.
  years_of_experience?: number;
  phone?: string;
  experience?: string; // Plain text experience for simpler portfolios
  education?: string; // Plain text education for simpler portfolios
  experiences?: Experience[];
  education_entries?: Education[];
  certifications?: Certification[];
  languages?: Language[];
  theme_settings?: Record<string, any>;
  is_profile_public: boolean;
  created_at: string;
  updated_at: string;
}

// User Profile interface for forms (compatible with DatabaseUser)
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  github_username: string;
  location?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  behance?: string;
  dribbble?: string;
  youtube?: string;
  facebook?: string;
  cv_url?: string;
  skills: string[];
  job_title?: string;
  field_of_work?: string;
  years_of_experience?: number;
  phone?: string;
  is_profile_public?: boolean;
}

// Education interface
export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  grade?: string;
  description?: string;
}

// Certification interface
export interface Certification {
  id?: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
}

// Language interface
export interface Language {
  id?: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner';
}

// Project interface - Now suitable for all fields, not just programming
export interface Project {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  url?: string; // General URL instead of github_link
  demo_link?: string;
  technologies: string[]; // Can be tools, software, techniques used
  image_url?: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: string; // e.g., 'design', 'marketing', 'research', 'development', 'art', etc.
  featured?: boolean;
  order?: number;
  sort_order?: number;
  project_type: 'professional' | 'personal' | 'academic' | 'volunteer';
  start_date?: string;
  end_date?: string;
  client?: string; // For freelancers or agencies
  created_at?: string;
  updated_at?: string;
}

// Social Link interface
export interface SocialLink {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  display_name?: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
