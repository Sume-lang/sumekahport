import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[]; // Note: 'files' (plural)
    const folder = formData.get('folder') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Upload all files in parallel
    const uploadResults = await Promise.all(
      files.map(file => 
        put(`${folder ? `${folder}/` : ''}${Date.now()}_${file.name}`, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })
      )
    );

    return NextResponse.json(uploadResults);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}