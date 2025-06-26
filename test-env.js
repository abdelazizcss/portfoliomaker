// Test environment variables
require('dotenv').config({ path: '.env.local' });

console.log('Testing environment variables...');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (starts with eyJ...)' : 'Not set');
console.log('GitHub ID:', process.env.GITHUB_ID);
console.log('NextAuth URL:', process.env.NEXTAUTH_URL);
