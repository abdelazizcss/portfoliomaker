-- Add deployed_site_url column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS deployed_site_url TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_deployed_site_url ON users(deployed_site_url);

-- Grant privileges to anon user
GRANT ALL PRIVILEGES ON TABLE users TO anon;
