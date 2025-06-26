import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const resolvedParams = await params;
    const username = resolvedParams.username;

    console.log('🔍 Looking for user with username:', username);

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    if (!supabase) {
      console.log('❌ Supabase not configured, returning demo user');
      const demoUser = {
        id: 'demo-user',
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: `${username}@example.com`,
        bio: 'Passionate developer creating amazing web experiences.',
        location: 'Remote',
        field_of_work: 'Full Stack Developer',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'],
        github_url: `https://github.com/${username}`,
        linkedin_url: `https://linkedin.com/in/${username}`,
        is_profile_public: true,
        projects: [],
        socialLinks: []
      };
      return NextResponse.json(demoUser);
    }

    console.log('📡 Querying users table...');
    
    // Try different username fields
    let user = null;
    let userError = null;

    // First try github_username
    const { data: userData1, error: userError1 } = await supabase
      .from('users')
      .select('*')
      .eq('github_username', username)
      .eq('is_profile_public', true)
      .single();

    if (userData1 && !userError1) {
      user = userData1;
      console.log('✅ Found user by github_username');
    } else {
      console.log('🔍 Trying username field...');
      // Try regular username field
      const { data: userData2, error: userError2 } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('is_profile_public', true)
        .single();

      if (userData2 && !userError2) {
        user = userData2;
        console.log('✅ Found user by username');
      } else {
        console.log('🔍 Trying email field...');
        // Try email field (without domain)
        const { data: userData3, error: userError3 } = await supabase
          .from('users')
          .select('*')
          .ilike('email', `${username}%`)
          .eq('is_profile_public', true)
          .single();

        if (userData3 && !userError3) {
          user = userData3;
          console.log('✅ Found user by email');
        } else {
          userError = userError3 || userError2 || userError1;
        }
      }
    }

    if (userError || !user) {
      console.log('❌ User not found:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('✅ User found:', user.name || user.email);

    // Get user's projects
    console.log('📁 Fetching projects for user ID:', user.id);
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('sort_order', { ascending: true });

    if (projectsError) {
      console.error('❌ Error fetching projects:', projectsError);
    } else {
      console.log('✅ Projects found:', projects?.length || 0);
    }

    // Get user's social links
    console.log('🔗 Fetching social links for user ID:', user.id);
    const { data: socialLinks, error: socialError } = await supabase
      .from('social_links')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (socialError) {
      console.error('❌ Error fetching social links:', socialError);
    } else {
      console.log('✅ Social links found:', socialLinks?.length || 0);
    }

    const responseData = {
      ...user,
      projects: projects || [],
      socialLinks: socialLinks || []
    };

    console.log('📤 Returning user data for:', user.name || user.email);
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error in GET /api/user/public/[username]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
