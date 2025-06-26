import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = {
  avatar: ['image/jpeg', 'image/png', 'image/webp'],
  cv: ['application/pdf'],
  project: ['image/jpeg', 'image/png', 'image/webp']
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'avatar', 'cv', 'project'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!fileType || !ALLOWED_TYPES[fileType as keyof typeof ALLOWED_TYPES]) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Check file type
    const allowedTypes = ALLOWED_TYPES[fileType as keyof typeof ALLOWED_TYPES];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `${fileType}_${timestamp}.${extension}`;
    const filePath = `${session.user.id}/${fileName}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Check if Supabase client is available
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('user-files')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Error uploading file:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Check if Supabase client is available
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-files')
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      url: publicUrl,
      fileName: fileName,
      filePath: filePath
    });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    // Verify the file belongs to the user
    if (!filePath.startsWith(session.user.id + '/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Check if Supabase client is available
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not initialized' }, { status: 500 });
    }

    const { error } = await supabase.storage
      .from('user-files')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
