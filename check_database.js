const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateDatabase() {
  console.log('🚀 Starting database update for all professional fields...');
  
  try {
    // First, let's check the current structure
    console.log('\n📋 Checking current users table structure...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Error accessing users table:', usersError.message);
      return;
    }
    
    console.log('✅ Users table accessible');
    
    // Check if we have the new fields
    if (users && users.length > 0) {
      const user = users[0];
      console.log('\n🔍 Current user fields:', Object.keys(user));
      
      const requiredFields = ['instagram', 'behance', 'dribbble', 'youtube', 'facebook', 'field_of_work', 'years_of_experience'];
      const missingFields = requiredFields.filter(field => !(field in user));
      
      if (missingFields.length > 0) {
        console.log('⚠️  Missing fields in users table:', missingFields);
        console.log('📝 You need to run the SQL update script in Supabase dashboard');
      } else {
        console.log('✅ All required fields exist in users table');
      }
    }
    
    // Check projects table
    console.log('\n📋 Checking projects table...');
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
      
    if (projectsError) {
      console.log('❌ Error accessing projects table:', projectsError.message);
    } else {
      console.log('✅ Projects table accessible');
      if (projects && projects.length > 0) {
        const project = projects[0];
        console.log('🔍 Current project fields:', Object.keys(project));
        
        if ('github_link' in project) {
          console.log('⚠️  Still using old field name "github_link" - should be "url"');
        }
        if ('url' in project) {
          console.log('✅ Using new field name "url"');
        }
      }
    }
    
    // Check new tables
    const newTables = ['experiences', 'education', 'certifications', 'languages'];
    console.log('\n📋 Checking new tables...');
    
    for (const tableName of newTables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('id')
        .limit(1);
        
      if (error) {
        console.log(`❌ Table "${tableName}" not found:`, error.message);
      } else {
        console.log(`✅ Table "${tableName}" exists`);
      }
    }
    
    console.log('\n📋 Database update check completed!');
    console.log('\n📝 To apply the updates, run the SQL script in Supabase:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy and paste the content of "update_schema_for_all_fields.sql"');
    console.log('   3. Click "Run" to execute the updates');
    
  } catch (error) {
    console.error('❌ Database update failed:', error.message);
  }
}

updateDatabase();
