import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { DatabaseUser, UserProfile } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If Supabase is not configured, return mock data
    if (!supabase) {
      console.log('Supabase not configured, returning mock data');
      const mockUser: DatabaseUser = {
        id: 'demo-user-' + session.user.id,
        github_id: session.user.id,
        github_username: session.user.github_username || session.user.name || 'user',
        name: session.user.name || 'Demo User',
        email: session.user.email || 'demo@example.com',
        bio: 'This is a demo profile. Connect your Supabase database to save real data.',
        avatar_url: session.user.image || '',
        location: 'Demo Location',
        website: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        behance: '',
        dribbble: '',
        youtube: '',
        facebook: '',
        cv_url: '',
        skills: ['Communication', 'Project Management', 'Leadership'],
        job_title: 'Professional',
        field_of_work: 'Technology',
        years_of_experience: 3,
        phone: '',
        is_profile_public: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ user: mockUser });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('github_id', session.user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ user: data });
  } catch (error) {
    console.error('Error in GET /api/user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const userData: Partial<DatabaseUser> = {
      github_id: session.user.id,
      github_username: session.user.github_username || session.user.name || 'user',
      name: body.name || session.user.name || 'User',
      email: body.email || session.user.email || 'user@example.com',
      bio: body.bio || '',
      avatar_url: body.avatar_url || session.user.image || '',
      location: body.location || '',
      website: body.website || '',
      linkedin: body.linkedin || '',
      twitter: body.twitter || '',
      instagram: body.instagram || '',
      behance: body.behance || '',
      dribbble: body.dribbble || '',
      youtube: body.youtube || '',
      facebook: body.facebook || '',
      cv_url: body.cv_url || '',
      skills: body.skills || [],
      job_title: body.job_title || '',
      field_of_work: body.field_of_work || '',
      years_of_experience: body.years_of_experience || 0,
      phone: body.phone || '',
      is_profile_public: body.is_profile_public ?? true,
    };

    console.log("DEBUG: Attempting to save user data:", JSON.stringify(userData, null, 2));

    // If Supabase is not configured, return mock success
    if (!supabase) {
      console.log('Supabase not configured, returning mock data');
      const mockUser: DatabaseUser = {
        ...userData as DatabaseUser,
        id: 'demo-user-' + session.user.id,
        github_id: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ user: mockUser });
    }

    // Check if user exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('id')
      .eq('github_id', session.user.id)
      .single();

    if (existingUserError && existingUserError.code !== 'PGRST116') {
      console.error('DEBUG: Error checking for existing user:', existingUserError);
      return NextResponse.json({ 
        error: 'Database error while checking user existence', 
        details: existingUserError.message,
        code: existingUserError.code
      }, { status: 500 });
    }

    let result;
    try {
      if (existingUser) {
        console.log(`DEBUG: User exists with ID ${existingUser.id}. Updating profile.`);
        // Update existing user
        const { data, error } = await supabase
          .from('users')
          .update(userData)
          .eq('github_id', session.user.id)
          .select()
          .single();
        result = { data, error };
      } else {
        console.log("DEBUG: User does not exist. Creating new user.");
        // Create new user
        const { data, error } = await supabase
          .from('users')
          .insert(userData)
          .select()
          .single();
        result = { data, error };
      }
    } catch (dbError) {
      console.error('DEBUG: Exception during database operation:', dbError);
      return NextResponse.json({ 
        error: 'Database operation failed', 
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }

    if (result.error) {
      console.error('DEBUG: Supabase error saving user:', result.error);
      
      // Check for RLS issues
      if (result.error.message.includes('permission denied')) {
        return NextResponse.json({ 
          error: 'Database permission error', 
          details: 'Row Level Security might be blocking access. Try disabling RLS on the users table.',
          message: result.error.message,
          code: result.error.code
        }, { status: 403 });
      }
      
      // Check for missing table
      if (result.error.code === '42P01') {
        return NextResponse.json({ 
          error: 'Missing table', 
          details: 'The users table does not exist. Run the setup SQL script first.',
          message: result.error.message,
          code: result.error.code
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: 'Database error', 
        details: result.error.message,
        code: result.error.code
      }, { status: 500 });
    }

    return NextResponse.json({ user: result.data });
  } catch (error) {
    console.error('DEBUG: Error in POST /api/user:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  return POST(request); // Same logic as POST for upsert
}
