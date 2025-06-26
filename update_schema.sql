-- Update users table to include new fields
ALTER TABLE users
ADD COLUMN IF NOT EXISTS job_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone VARCHAR(255),
ADD COLUMN IF NOT EXISTS theme_settings JSONB,
ADD COLUMN IF NOT EXISTS experiences JSONB;

-- Add new columns to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS order INTEGER DEFAULT 0;

-- Update RLS policy for users
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Enable row level security for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view public profiles
CREATE POLICY IF NOT EXISTS "Users can view public profiles"
  ON users FOR SELECT
  USING (is_profile_public = true OR auth.uid() = id);

-- Policy: Users can update their own profiles
CREATE POLICY IF NOT EXISTS "Users can update their own profiles"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profiles
CREATE POLICY IF NOT EXISTS "Users can insert their own profiles"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Update RLS policy for projects
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Enable row level security for projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view projects from public profiles
CREATE POLICY IF NOT EXISTS "Anyone can view projects from public profiles"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = projects.user_id
      AND (users.is_profile_public = true OR auth.uid() = users.id)
    )
  );

-- Policy: Users can manage their own projects
CREATE POLICY IF NOT EXISTS "Users can manage their own projects"
  ON projects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to check if authenticated user owns the row
CREATE OR REPLACE FUNCTION auth.is_row_owner(table_name text, record_id uuid)
RETURNS boolean as $$
DECLARE
  user_id uuid;
BEGIN
  EXECUTE format('SELECT user_id FROM %I WHERE id = $1', table_name)
  INTO user_id
  USING record_id;
  
  RETURN user_id = auth.uid();
END;
$$ language plpgsql security definer;
