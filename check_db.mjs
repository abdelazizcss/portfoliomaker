import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmrwiezcomdmycnpyixs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcndpZXpjb21kbXljbnB5aXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTgxOTQsImV4cCI6MjA2NjA5NDE5NH0.7PnVtRv611GWfxztSCZ5a-DEoGIGq0q60CdNu8JvyG0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking database structure...');
  
  try {
    // Check users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Users table error:', usersError.message);
      return;
    }
    
    console.log('✅ Users table accessible');
    
    if (users && users.length > 0) {
      const userFields = Object.keys(users[0]);
      console.log('📋 Current user fields:', userFields);
      
      // Check for new fields
      const newFields = ['instagram', 'behance', 'dribbble', 'youtube', 'facebook', 'field_of_work', 'years_of_experience'];
      const missingFields = newFields.filter(field => !userFields.includes(field));
      
      if (missingFields.length > 0) {
        console.log('⚠️  Missing fields:', missingFields);
        console.log('📝 Need to apply SQL update script');
      } else {
        console.log('✅ All new fields present');
      }
    }
    
    // Check projects table for url vs github_link
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
      
    if (!projectsError && projects && projects.length > 0) {
      const projectFields = Object.keys(projects[0]);
      console.log('📋 Project fields:', projectFields);
      
      if (projectFields.includes('github_link')) {
        console.log('⚠️  Projects table still using "github_link" - needs update to "url"');
      }
      if (projectFields.includes('url')) {
        console.log('✅ Projects table using "url" field');
      }
    }
    
    // Check new tables
    const newTables = ['experiences', 'education', 'certifications', 'languages'];
    
    for (const table of newTables) {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      
      if (error) {
        console.log(`❌ Table "${table}" missing`);
      } else {
        console.log(`✅ Table "${table}" exists`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();
