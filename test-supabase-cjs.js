// Test Supabase connection with CommonJS
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fmrwiezcomdmycnpyixs.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcndpZXpjb21kbXljbnB5aXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTgxOTQsImV4cCI6MjA2NjA5NDE5NH0.7PnVtRv611GWfxztSCZ5a-DEoGIGq0q60CdNu8JvyG0';

  console.log('URL:', supabaseUrl);
  console.log('Key length:', supabaseAnonKey?.length);

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  if (!supabase) {
    console.error('❌ Supabase client is not configured');
    return;
  }

  try {
    // Test basic connection by selecting count from users table
    console.log('📡 Testing connection to "users" table...');
    const { data, error } = await supabase.from('users').select('count(*)').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      console.error('Error details:', error);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Data:', data);
    }

    // Try to get the database schema information
    console.log('\n📋 Getting database schema information...');
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(10);

    if (tablesError) {
      console.error('❌ Failed to get tables:', tablesError.message);
    } else {
      console.log('Tables in public schema:');
      console.log(tablesData);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testSupabaseConnection();
