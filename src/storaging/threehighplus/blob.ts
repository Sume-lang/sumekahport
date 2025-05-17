import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
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

    // Upload to Vercel Blob
    const blob = await put(`${folder ? `${folder}/` : ''}${Date.now()}_${file.name}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN, // Explicitly pass the token
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN, // Explicitly pass the token
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blob delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}