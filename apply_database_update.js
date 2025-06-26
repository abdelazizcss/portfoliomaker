// Apply database schema updates for all professional fields
// Updated implementation with better error handling and SQL execution

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Use environment variables or fallback to hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fmrwiezcomdmycnpyixs.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcndpZXpjb21kbXljbnB5aXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTgxOTQsImV4cCI6MjA2NjA5NDE5NH0.7PnVtRv611GWfxztSCZ5a-DEoGIGq0q60CdNu8JvyG0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDatabase() {
  console.log('🚀 Starting database schema update...');
  
  try {
    // Read SQL file
    const sqlFilePath = path.join(process.cwd(), 'update_schema_for_all_fields.sql');
    
    if (fs.existsSync(sqlFilePath)) {
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      console.log('SQL file read successfully. Processing...');
      
      // Split SQL into individual statements
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));
      
      console.log(`Found ${statements.length} SQL statements to execute`);
      
      // Process each statement
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        
        try {
          // Execute directly through Supabase API
          // Note: This approach has limitations and may not work for all SQL commands
          const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });
          
          if (error) {
            console.log(`⚠️ Warning with statement ${i + 1}: ${error.message}`);
            console.log('This error may be expected if the statement is trying to create something that already exists.');
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (stmtError) {
          console.error(`❌ Error executing statement ${i + 1}:`, stmtError);
        }
      }
      
      console.log('\n✅ Database update process completed!');
      console.log('📋 You may want to run check_database_compatibility.js to verify all changes were applied correctly.');
    } else {
      console.error('❌ SQL file not found! Please make sure update_schema_for_all_fields.sql exists in the project root.');
    }
  } catch (error) {
    console.error('❌ Error during database update:', error);
    console.log('\n⚠️ If you encounter issues with this script, you can:');
    console.log('1. Copy the contents of update_schema_for_all_fields.sql');
    console.log('2. Go to your Supabase dashboard');
    console.log('3. Open the SQL Editor');
    console.log('4. Paste and execute the SQL statements manually');
  }
}

// Check if exec_sql function exists, and create it if it doesn't
async function setupExecSqlFunction() {
  try {
    console.log('Checking if exec_sql function exists...');
    
    // Create the exec_sql function if it doesn't exist
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
      RETURNS VOID
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        EXECUTE sql_query;
      END;
      $$;
    `;
    
    const { error } = await supabase.rpc('exec_sql', { sql_query: 'SELECT 1;' });
    
    if (error) {
      console.log('Creating exec_sql function...');
      
      // Try to create the function directly
      const { data, error: directError } = await supabase.query(createFunctionSQL);
      
      if (directError) {
        console.error('❌ Failed to create exec_sql function:', directError);
        return false;
      }
      
      console.log('✅ exec_sql function created successfully');
    } else {
      console.log('✅ exec_sql function already exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up exec_sql function:', error);
    return false;
  }
}

// Main execution
async function main() {
  const funcReady = await setupExecSqlFunction();
  
  if (funcReady) {
    await updateDatabase();
  } else {
    console.log('\n⚠️ Cannot proceed with automatic updates. Please execute the SQL manually:');
    console.log('1. Copy the contents of update_schema_for_all_fields.sql');
    console.log('2. Go to your Supabase dashboard');
    console.log('3. Open the SQL Editor');
    console.log('4. Paste and execute the SQL statements manually');
  }
}

main();
