// Database Compatibility Check Utility
// This script checks compatibility between API interfaces and database schema

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseCompatibility() {
  console.log('Starting database compatibility check...');
  
  try {
    // Check users table
    console.log('Checking users table...');
    const { data: userColumns, error: userError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (userError) {
      console.error('Error checking users table:', userError.message);
    } else {
      const userFields = userColumns.length > 0 
        ? Object.keys(userColumns[0]) 
        : [];
      
      console.log('User fields in database:');
      console.log(userFields);
      
      // Check for required fields
      const requiredUserFields = [
        'id', 'github_id', 'name', 'email', 'bio', 
        'avatar_url', 'github_username', 'field_of_work', 
        'years_of_experience', 'skills'
      ];
      
      const missingUserFields = requiredUserFields.filter(field => !userFields.includes(field));
      
      if (missingUserFields.length > 0) {
        console.error('Missing required user fields:', missingUserFields);
        console.log('Please run the update_schema_for_all_fields.sql script');
      } else {
        console.log('All required user fields are present!');
      }
    }
    
    // Check projects table
    console.log('\nChecking projects table...');
    const { data: projectColumns, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    
    if (projectError) {
      console.error('Error checking projects table:', projectError.message);
    } else {
      const projectFields = projectColumns.length > 0 
        ? Object.keys(projectColumns[0]) 
        : [];
      
      console.log('Project fields in database:');
      console.log(projectFields);
      
      // Check for url field (previously github_link)
      if (!projectFields.includes('url')) {
        console.error('Missing url field in projects table. The github_link might not have been renamed.');
        console.log('Please run the update_schema_for_all_fields.sql script');
      } else {
        console.log('Project url field is present!');
      }
      
      // Check for new project fields
      const newProjectFields = ['project_type', 'start_date', 'end_date', 'client'];
      const missingProjectFields = newProjectFields.filter(field => !projectFields.includes(field));
      
      if (missingProjectFields.length > 0) {
        console.error('Missing new project fields:', missingProjectFields);
        console.log('Please run the update_schema_for_all_fields.sql script');
      } else {
        console.log('All new project fields are present!');
      }
    }
    
    // Check if new tables exist
    console.log('\nChecking for new tables...');
    const newTables = ['experiences', 'education', 'certifications', 'languages'];
    
    for (const table of newTables) {
      const { data, error } = await supabase
        .from(table)
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error(`Table ${table} may not exist:`, error.message);
        console.log('Please run the update_schema_for_all_fields.sql script');
      } else {
        console.log(`Table ${table} exists!`);
      }
    }
    
    console.log('\nDatabase compatibility check completed.');
    
  } catch (error) {
    console.error('Error during compatibility check:', error);
  }
}

// Run the check
checkDatabaseCompatibility();
