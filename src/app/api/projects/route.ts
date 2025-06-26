import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');

    console.log('📁 Projects API called with:', { userId, username });

    // If Supabase is not configured, return mock projects
    if (!supabase) {
      console.log('Supabase not configured, returning mock projects');
      const mockProjects: Project[] = [
        {
          id: 'demo-project-1',
          title: 'Professional Portfolio Website',
          description: 'A responsive portfolio website showcasing design work and client projects.',
          url: 'https://github.com/demo/portfolio-maker',
          demo_link: 'https://portfolio-maker-demo.vercel.app',
          technologies: ['Next.js', 'TypeScript', 'Chakra UI', 'Supabase', 'NextAuth.js'],
          image_url: '',
          status: 'completed',
          category: 'Web Development',
          project_type: 'professional',
          featured: true,
          sort_order: 0,
        },
        {
          id: 'demo-project-2',
          title: 'Brand Identity Design',
          description: 'Complete brand identity package including logo, color palette, and brand guidelines.',
          url: 'https://behance.net/demo/brand-project',
          demo_link: '',
          technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Strategy'],
          image_url: '',
          status: 'completed',
          category: 'Graphic Design',
          project_type: 'professional',
          client: 'Tech Startup Inc.',
          featured: false,
          sort_order: 1,
        }
      ];
      return NextResponse.json(mockProjects);
    }

    let query = supabase.from('projects').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    } else if (username) {
      // Get user by username first
      console.log('🔍 Looking for user with username:', username);
      
      // Try different username fields
      let user = null;
      
      // First try github_username
      const { data: userData1 } = await supabase
        .from('users')
        .select('id')
        .eq('github_username', username)
        .single();

      if (userData1) {
        user = userData1;
        console.log('✅ Found user by github_username');
      } else {
        // Try regular username field
        const { data: userData2 } = await supabase
          .from('users')
          .select('id')
          .eq('username', username)
          .single();

        if (userData2) {
          user = userData2;
          console.log('✅ Found user by username');
        } else {
          // Try email field (without domain)
          const { data: userData3 } = await supabase
            .from('users')
            .select('id')
            .ilike('email', `${username}%`)
            .single();

          if (userData3) {
            user = userData3;
            console.log('✅ Found user by email');
          }
        }
      }
      
      if (!user) {
        console.log('❌ User not found for username:', username);
        return NextResponse.json([]); // Return empty array instead of error
      }
      
      console.log('📁 Fetching projects for user ID:', user.id);
      query = query.eq('user_id', user.id);
    } else if (session?.user?.id) {
      // Get current user's projects
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('github_id', session.user.id)
        .single();
      
      if (user) {
        query = query.eq('user_id', user.id);
      }
    }

    const { data, error } = await query.order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      
      // Check for RLS issues
      if (error.message && error.message.includes('violates row-level security')) {
        console.error('RLS policy is blocking project fetch. You need to disable RLS on the projects table or fix the policy.');
        return NextResponse.json({ 
          error: 'Database permission error', 
          details: 'Row Level Security is blocking access to the projects table.',
          code: error.code || 'RLS_ERROR',
          message: error.message
        }, { status: 403 });
      }
      
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    console.log(`📁 Returning ${data?.length || 0} projects`);
    
    // If no projects found and we have a username, return sample projects
    if ((!data || data.length === 0) && username) {
      const sampleProjects = [
        {
          id: 'sample-1',
          title: 'Portfolio Website',
          description: 'A modern, responsive portfolio website built with Next.js and TypeScript.',
          url: 'https://github.com/example/portfolio',
          technologies: ['Next.js', 'TypeScript', 'Chakra UI', 'React'],
          project_type: 'personal',
          status: 'completed',
          featured: true,
          sort_order: 1,
        },
        {
          id: 'sample-2',
          title: 'E-commerce Dashboard',
          description: 'Admin dashboard for managing online store with real-time analytics.',
          url: 'https://github.com/example/dashboard',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          project_type: 'professional',
          status: 'completed',
          featured: true,
          sort_order: 2,
        },
        {
          id: 'sample-3',
          title: 'Task Management App',
          description: 'Collaborative task management application with team features.',
          url: 'https://github.com/example/taskapp',
          technologies: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'],
          project_type: 'personal',
          status: 'in_progress',
          featured: true,
          sort_order: 3,
        }
      ];
      console.log('📁 Returning sample projects');
      return NextResponse.json(sampleProjects);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
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

    // If Supabase is not configured, return mock success
    if (!supabase) {
      console.log('Supabase not configured, returning mock project');
      const mockProject: Project = {
        id: 'demo-project-' + Date.now(),
        user_id: 'demo-user-' + session.user.id,
        title: body.title,
        description: body.description,
        url: body.url,
        demo_link: body.demo_link,
        technologies: body.technologies || [],
        image_url: body.image_url,
        status: body.status || 'completed',
        category: body.category,
        project_type: body.project_type || 'professional',
        start_date: body.start_date,
        end_date: body.end_date,
        client: body.client,
        featured: body.featured || false,
        sort_order: body.sort_order || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ project: mockProject });
    }

    // Get user ID from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('github_id', session.user.id)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
      user_id: user.id,
      title: body.title,
      description: body.description,
      url: body.url,
      demo_link: body.demo_link,
      technologies: body.technologies || [],
      image_url: body.image_url,
      status: body.status || 'completed',
      category: body.category,
      project_type: body.project_type || 'professional',
      start_date: body.start_date && body.start_date.trim() !== '' ? body.start_date : null,
      end_date: body.end_date && body.end_date.trim() !== '' ? body.end_date : null,
      client: body.client,
      featured: body.featured || false,
      sort_order: body.sort_order || 0,
    };

    console.log('DEBUG: Attempting to create project:', JSON.stringify(projectData, null, 2));

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      
      // Check for RLS issues
      if (error.message.includes('violates row-level security') || error.code === '42501') {
        console.log('DEBUG: RLS policy is blocking project creation. You need to disable RLS on the projects table.');
        return NextResponse.json({ 
          error: 'Database permission error', 
          details: 'Row Level Security is blocking access to the projects table. Run SQL: ALTER TABLE projects DISABLE ROW LEVEL SECURITY;',
          code: error.code,
          message: error.message
        }, { status: 403 });
      }
      
      return NextResponse.json({ 
        error: 'Database error', 
        details: error.message,
        code: error.code
      }, { status: 500 });
    }

    return NextResponse.json({ project: data });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = await request.json();
    const projectId = body.id;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    // Verify project ownership
    const { data: project } = await supabase
      .from('projects')
      .select(`
        user_id,
        users!inner(github_id)
      `)
      .eq('id', projectId)
      .single();

    if (!project || (project.users as any)?.github_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updateData = {
      title: body.title,
      description: body.description,
      url: body.url, // Corrected from github_link to url
      demo_link: body.demo_link,
      technologies: body.technologies || [],
      image_url: body.image_url,
      status: body.status || 'completed',
      category: body.category,
      project_type: body.project_type || 'professional',
      start_date: body.start_date && body.start_date.trim() !== '' ? body.start_date : null,
      end_date: body.end_date && body.end_date.trim() !== '' ? body.end_date : null,
      client: body.client,
      featured: body.featured || false,
      sort_order: body.sort_order || 0,
    };

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ project: data });
  } catch (error) {
    console.error('Error in PUT /api/projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    // Verify project ownership
    const { data: project } = await supabase
      .from('projects')
      .select(`
        user_id,
        users!inner(github_id)
      `)
      .eq('id', projectId)
      .single();

    if (!project || (project.users as any)?.github_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
