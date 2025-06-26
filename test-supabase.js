// Test Supabase connection
import { supabase } from './src/lib/supabase';

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  if (!supabase) {
    console.error('❌ Supabase client is not configured');
    return;
  }

  try {
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count(*)').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('📊 Data:', data);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testSupabaseConnection();
