const { createClient } = require('@supabase/supabase-js');

// Test Supabase connection
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
    // Test basic connection - fixed query syntax
    console.log('📡 Testing connection to "users" table...');
    const { data, error } = await supabase.from('users').select('id').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Data:', data);
    }

    // Try to run a basic query to check tables
    console.log('\n📋 Checking if users table exists...');
    const { data: tableData, error: tableError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (tableError) {
      if (tableError.code === 'PGRST116') {
        console.log('ℹ️ The users table exists but is empty');
      } else if (tableError.code.includes('42P01')) {
        console.error('❌ The users table does not exist. You need to run the SQL setup script');
      } else {
        console.error('❌ Error accessing users table:', tableError.message);
      }
    } else {
      console.log('✅ Users table exists and is accessible');
    }

    // Test RLS policies
    console.log('\n🔒 Testing if Row Level Security might be blocking access...');
    try {
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert({
          github_id: 'test-user-' + Date.now(),
          github_username: 'test-user-' + Date.now(),
          name: 'Test User',
          email: 'test@example.com'
        })
        .select();
      
      if (insertError) {
        console.error('❌ Insert test failed. This might be due to RLS policies:', insertError.message);
        
        if (insertError.message.includes('permission denied')) {
          console.log('💡 SUGGESTION: Try disabling Row Level Security on the users table temporarily');
          console.log('   Run this SQL in Supabase SQL Editor: ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
        }
      } else {
        console.log('✅ Insert test passed. RLS is not blocking inserts.');
        
        // Clean up test data
        if (insertData && insertData[0] && insertData[0].id) {
          await supabase.from('users').delete().eq('id', insertData[0].id);
          console.log('🧹 Test data cleaned up');
        }
      }
    } catch (err) {
      console.error('❌ Unexpected error during RLS test:', err);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testSupabaseConnection();
