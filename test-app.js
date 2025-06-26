// Test script for Portfolio App
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Portfolio App...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL=https://')) {
    console.log('✅ Supabase URL is configured');
  } else {
    console.log('❌ Supabase URL not found or invalid');
  }
  
  if (envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ')) {
    console.log('✅ Supabase Anon Key is configured');
  } else {
    console.log('❌ Supabase Anon Key not found or invalid');
  }
  
  if (envContent.includes('GITHUB_ID=Ov23li')) {
    console.log('✅ GitHub OAuth is configured');
  } else {
    console.log('❌ GitHub OAuth not configured');
  }
} else {
  console.log('❌ .env.local file not found');
}

// Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json exists');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (pkg.scripts && pkg.scripts.dev) {
    console.log('✅ dev script exists');
  } else {
    console.log('❌ dev script not found');
  }
} else {
  console.log('❌ package.json not found');
}

// Check key files
const keyFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/lib/supabase.ts',
  'src/lib/api.ts'
];

keyFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

console.log('\n🚀 Starting development server...');
console.log('Run: npm run dev');
console.log('Then visit: http://localhost:3000');
console.log('\n📋 Test Checklist:');
console.log('1. Landing page loads correctly');
console.log('2. GitHub Sign In works');
console.log('3. Dashboard loads after sign in');
console.log('4. Profile editing works');
console.log('5. Project creation works');
console.log('6. Portfolio page displays');
