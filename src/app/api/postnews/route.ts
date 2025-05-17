// app/api/blob/route.ts
import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Upload endpoint
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, GIF, or WebP files are allowed' },
        { status: 400 }
      );
    }

    // Create organized folder structure
    const pathPrefix = folder ? `${folder}/` : 'postsnews/';
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const blobPath = `${pathPrefix}${filename}`;

    // Upload to Vercel Blob
    const blob = await put(blobPath, file, {
      access: 'public',
    });

    return NextResponse.json({
      ...blob,
      folder: pathPrefix,
      originalName: file.name,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete endpoint
export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    await del(url);

    return NextResponse.json(
      { success: true, message: 'File deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Blob delete error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge'; // For Vercel Blob compatibility
export const dynamic = 'force-dynamic';