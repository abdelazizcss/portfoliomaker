-- Check and insert test user data
-- First, let's see what users we have
SELECT id, name, email, github_username, username, is_profile_public FROM users LIMIT 5;

-- Insert a test user if none exists
INSERT INTO users (
  name, 
  email, 
  github_username, 
  username,
  bio, 
  location,
  field_of_work,
  skills,
  is_profile_public,
  created_at,
  updated_at
) 
VALUES (
  'Abdelaziz CSS',
  'abdelazizcss@example.com',
  'abdelazizcss',
  'abdelazizcss',
  'Frontend Developer passionate about creating beautiful and functional web applications.',
  'Morocco',
  'Frontend Developer',
  ARRAY['React', 'Next.js', 'TypeScript', 'Chakra UI', 'CSS', 'JavaScript'],
  true,
  NOW(),
  NOW()
) 
ON CONFLICT (email) DO UPDATE SET
  github_username = EXCLUDED.github_username,
  username = EXCLUDED.username,
  is_profile_public = EXCLUDED.is_profile_public,
  updated_at = NOW();

-- Get the user ID for projects
SELECT id FROM users WHERE github_username = 'abdelazizcss' OR username = 'abdelazizcss';

-- Insert some test projects
INSERT INTO projects (
  user_id,
  title,
  description,
  url,
  technologies,
  project_type,
  status,
  featured,
  sort_order,
  created_at,
  updated_at
) 
SELECT 
  u.id,
  'Portfolio Website',
  'A modern portfolio website built with Next.js and Chakra UI.',
  'https://github.com/abdelazizcss/portfolio',
  ARRAY['Next.js', 'React', 'Chakra UI', 'TypeScript'],
  'personal',
  'completed',
  true,
  1,
  NOW(),
  NOW()
FROM users u 
WHERE u.github_username = 'abdelazizcss' OR u.username = 'abdelazizcss'
ON CONFLICT DO NOTHING;

INSERT INTO projects (
  user_id,
  title,
  description,
  url,
  technologies,
  project_type,
  status,
  featured,
  sort_order,
  created_at,
  updated_at
) 
SELECT 
  u.id,
  'E-commerce Dashboard',
  'Admin dashboard for managing online store with real-time analytics.',
  'https://github.com/abdelazizcss/ecommerce-dashboard',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
  'professional',
  'completed',
  true,
  2,
  NOW(),
  NOW()
FROM users u 
WHERE u.github_username = 'abdelazizcss' OR u.username = 'abdelazizcss'
ON CONFLICT DO NOTHING;
