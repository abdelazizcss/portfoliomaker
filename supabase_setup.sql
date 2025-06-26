-- Portfolio Maker Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    github_id VARCHAR(255) UNIQUE NOT NULL,
    github_username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    location VARCHAR(255),
    website TEXT,
    linkedin TEXT,
    twitter TEXT,
    cv_url TEXT,
    skills TEXT[], -- Array of skills
    job_title VARCHAR(255),
    phone VARCHAR(50),
    is_profile_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_link TEXT,
    demo_link TEXT,
    technologies TEXT[], -- Array of technologies
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'completed', -- completed, in-progress, planned
    category VARCHAR(100),
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- github, linkedin, twitter, website, etc.
    url TEXT NOT NULL,
    display_name VARCHAR(255),
    is_visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_users_github_username ON users(github_username);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_social_links_user_id ON social_links(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at 
    BEFORE UPDATE ON social_links 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Set up Row Level Security (RLS) - Disabled temporarily for testing
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table - Temporarily disabled for testing
-- Users can read their own data and public profiles
/*
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = github_id OR is_profile_public = true);

-- Users can insert their own data
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid()::text = github_id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = github_id);

-- Users can delete their own data
CREATE POLICY "Users can delete own profile" ON users
    FOR DELETE USING (auth.uid()::text = github_id);
*/

-- RLS Policies for projects table - Temporarily disabled for testing
/*
-- Users can read projects from public profiles or their own
CREATE POLICY "Users can view projects" ON projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = projects.user_id 
            AND (users.is_profile_public = true OR auth.uid()::text = users.github_id)
        )
    );

-- Users can insert their own projects
CREATE POLICY "Users can insert own projects" ON projects
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = projects.user_id 
            AND auth.uid()::text = users.github_id
        )
    );

-- Users can update their own projects
CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = projects.user_id 
            AND auth.uid()::text = users.github_id
        )
    );

-- Users can delete their own projects
CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = projects.user_id 
            AND auth.uid()::text = users.github_id
        )
    );
*/

-- RLS Policies for social_links table - Temporarily disabled for testing
/*
-- Users can read social links from public profiles or their own
CREATE POLICY "Users can view social links" ON social_links
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = social_links.user_id 
            AND (users.is_profile_public = true OR auth.uid()::text = users.github_id)
        )
    );

-- Users can insert their own social links
CREATE POLICY "Users can insert own social links" ON social_links
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = social_links.user_id 
            AND auth.uid()::text = users.github_id
        )
    );

-- Users can update their own social links
CREATE POLICY "Users can update own social links" ON social_links
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = social_links.user_id 
            AND auth.uid()::text = users.github_id
        )
    );

-- Users can delete their own social links
CREATE POLICY "Users can delete own social links" ON social_links
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = social_links.user_id 
            AND auth.uid()::text = users.github_id
        )
    );
*/

-- Create storage bucket for user files
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-files', 'user-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'user-files' 
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can view files" ON storage.objects
    FOR SELECT USING (bucket_id = 'user-files');

CREATE POLICY "Users can update their own files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'user-files' 
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete their own files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'user-files' 
        AND (storage.foldername(name))[1] = auth.uid()::text
    );
