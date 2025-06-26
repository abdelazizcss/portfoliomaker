-- Update schema to support all professional fields
-- Run this SQL in Supabase SQL Editor

-- Add new columns to users table for expanded professional support
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS instagram TEXT,
ADD COLUMN IF NOT EXISTS behance TEXT,
ADD COLUMN IF NOT EXISTS dribbble TEXT,
ADD COLUMN IF NOT EXISTS youtube TEXT,
ADD COLUMN IF NOT EXISTS facebook TEXT,
ADD COLUMN IF NOT EXISTS field_of_work VARCHAR(100), -- e.g., 'Design', 'Marketing', 'Engineering'
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER DEFAULT 0;

-- Update projects table to support all types of work
ALTER TABLE projects 
RENAME COLUMN github_link TO url; -- More generic name for project URLs

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS project_type VARCHAR(50) DEFAULT 'professional', -- 'professional', 'personal', 'academic', 'volunteer'
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS client VARCHAR(255); -- For freelancers or agencies

-- Create experiences table for work history
CREATE TABLE IF NOT EXISTS experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL, -- Company, university, organization
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    type VARCHAR(50) DEFAULT 'work', -- 'work', 'internship', 'volunteer', 'education', 'freelance', 'project'
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50) NOT NULL, -- 'native', 'fluent', 'advanced', 'intermediate', 'beginner'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_experiences_user_id ON experiences(user_id);
CREATE INDEX IF NOT EXISTS idx_education_user_id ON education(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_languages_user_id ON languages(user_id);

-- Create triggers for updated_at on new tables
CREATE TRIGGER update_experiences_updated_at 
    BEFORE UPDATE ON experiences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at 
    BEFORE UPDATE ON education 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at 
    BEFORE UPDATE ON certifications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_languages_updated_at 
    BEFORE UPDATE ON languages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample field_of_work values as comments for reference
/*
Common field_of_work values:
- Technology & IT
- Design & Creative
- Marketing & Sales
- Business & Management
- Engineering
- Healthcare & Medicine
- Education & Training
- Finance & Accounting
- Law & Legal Services
- Media & Communications
- Architecture & Construction
- Science & Research
- Arts & Entertainment
- Sports & Fitness
- Hospitality & Tourism
- Non-profit & Social Work
- Government & Public Service
- Consulting
- Freelance & Self-employed
- Student
- Other
*/

-- Update existing projects to have url column if github_link exists
-- This is handled by the RENAME COLUMN above

COMMENT ON TABLE users IS 'User profiles supporting all professional fields';
COMMENT ON TABLE projects IS 'Projects/work samples for all types of professionals';
COMMENT ON TABLE experiences IS 'Work experience, internships, volunteer work, etc.';
COMMENT ON TABLE education IS 'Educational background';
COMMENT ON TABLE certifications IS 'Professional certifications and achievements';
COMMENT ON TABLE languages IS 'Language skills and proficiency levels';
