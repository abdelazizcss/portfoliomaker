'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { fetchGitHubRepositories, importGitHubRepository } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const username = session.user.github_username || request.nextUrl.searchParams.get('username');
    
    if (!username) {
      return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 });
    }
    
    const repositories = await fetchGitHubRepositories(username);
    
    return NextResponse.json({ repositories });
  } catch (error: any) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { repoFullName } = body;
    
    if (!repoFullName) {
      return NextResponse.json({ error: 'Repository full name is required' }, { status: 400 });
    }
    
    const project = await importGitHubRepository(repoFullName);
    
    return NextResponse.json({ project });
  } catch (error: any) {
    console.error('Error importing GitHub repository:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import GitHub repository' },
      { status: 500 }
    );
  }
}
