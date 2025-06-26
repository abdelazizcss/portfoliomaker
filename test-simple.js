#!/usr/bin/env node

// Simple test to check if environment variables are loaded correctly
console.log('🔍 Testing Environment Variables...');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 'NOT SET');
console.log('GITHUB_ID:', process.env.GITHUB_ID || 'NOT SET');

// Test direct values
const url = 'https://fmrwiezcomdmycnpyixs.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcndpZXpjb21kbXljbnB5aXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTgxOTQsImV4cCI6MjA2NjA5NDE5NH0.7PnVtRv611GWfxztSCZ5a-DEoGIGq0q60CdNu8JvyG0';

console.log('\n✅ Direct values:');
console.log('URL:', url);
console.log('Key length:', key.length);

console.log('\n🎯 Test completed!');
