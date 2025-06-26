// filepath: /home/azizcs/Desktop/portfolioMaker/portfolio-app/src/app/api/deploy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { generatePortfolioHTML } from '@/lib/portfolio-generator';
import { deployToGitHub } from '@/lib/github-deploy';
import { DatabaseUser, Project } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { repoName, description } = body;

    if (!repoName) {
      return NextResponse.json({ error: 'Repository name is required' }, { status: 400 });
    }

    // Check if Supabase client is available
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    // Fetch user profile data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('github_id', session.user.id)
      .single();

    if (userError || !user) {
      console.error('Error fetching user data:', userError);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
    
    // Log CV URL for debugging
    console.log('CV URL from database:', user.cv_url);

    // Fetch user's projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)  // Use user.id (database ID), not session.user.id (github_id)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    // Generate the HTML content
    const htmlContent = generatePortfolioHTML(user as DatabaseUser, projects as Project[] || []);

    try {
      // Add GitHub token from session to user object
      const userWithToken = {
        ...user,
        github_token: session.user.github_token
      } as DatabaseUser;

      // Deploy to GitHub
      const deployResult = await deployToGitHub({
        user: userWithToken,
        repoName,
        description: description || `Portfolio website for ${user.name}`,
        htmlContent,
        projects: projects as Project[] || []
      });
      
      // Update the deployed site URL in the database
      const { error: updateError } = await supabase
        .from('users')
        .update({ deployed_site_url: deployResult.pageUrl })
        .eq('id', user.id);
      
      if (updateError) {
        console.error('Error updating deployed site URL:', updateError);
        // Continue anyway, this is not critical
      }

      // Return the result with repo and page URLs
      return NextResponse.json({
        success: true,
        repoUrl: deployResult.repoUrl,
        pageUrl: deployResult.pageUrl
      });
    } catch (deployError: any) {
      console.error('GitHub deployment error:', deployError);
      return NextResponse.json({ 
        error: 'GitHub deployment failed', 
        message: deployError.message || 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in deploy API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}