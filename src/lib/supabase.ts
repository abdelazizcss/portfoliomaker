import { createClient } from '@supabase/supabase-js';
import { DatabaseUser, Project, SocialLink } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Debug logging only in development
if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Supabase Config Debug:');
  console.log('URL:', supabaseUrl);
  console.log('Key length:', supabaseAnonKey?.length);
  console.log('Service key available:', !!supabaseServiceKey);
}

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder');

// Server-side client with service role key (when available)
export const supabaseAdmin = supabaseServiceKey && isSupabaseConfigured ? 
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    }
  }) : null;

// Client-side client with anon key
export const supabase = isSupabaseConfigured ? 
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: 'portfolio-maker-auth',
    }
  }) : null;

// Log creation status only in development
if (process.env.NODE_ENV !== 'production') {
  console.log('✅ Supabase configured:', isSupabaseConfigured);
  console.log('📡 Supabase client created:', !!supabase);
  console.log('⚙️ Supabase admin created:', !!supabaseAdmin);
}

// Export a function to get client based on context
export function getSupabaseClient() {
  return supabase;
}

// Export a function to get admin client based on context
export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not configured');
  }
  return supabaseAdmin;
}

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: DatabaseUser;
        Insert: Omit<DatabaseUser, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<DatabaseUser, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Project, 'id'>>;
      };
      social_links: {
        Row: SocialLink;
        Insert: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<SocialLink, 'id'>>;
      };
    };
  };
};
