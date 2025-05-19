// app/api/blob/route.ts
import { uploadFile, deleteFile, fileExists } from '@/lib/blob';
import { NextResponse } from 'next/server';
import { validateFile } from '@/lib/validations'; // You might want to create this

// Helper for error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return errorResponse('No file provided', 400);
    }
    // Validate file
    const validation = await validateFile(file, {
      // Customize these for your needs:
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf'
      ]
    });

    if (!validation.valid) {
      return errorResponse(validation.error || 'Invalid file', 400);
    }

    // Validate folder name if provided
    if (folder) {
      const folderRegex = /^[a-zA-Z0-9_-]+$/;
      if (!folderRegex.test(folder)) {
        return errorResponse('Invalid folder name', 400);
      }
    }

    const result = await uploadFile(file!, folder || undefined);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Blob upload error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Upload failed',
      500
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return errorResponse('No URL provided', 400);
    }

    // Optional: Verify file exists before deletion
    const exists = await fileExists(url);
    if (!exists) {
      return errorResponse('File not found', 404);
    }

    await deleteFile(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blob delete error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to delete file';
      
    return errorResponse(errorMessage, 500);
  }
}

// Optional: GET endpoint to check file existence
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return errorResponse('No URL provided', 400);
    }

    const exists = await fileExists(url);
    return NextResponse.json({ exists });
  } catch (error) {
    console.error('Blob check error:', error);
    return errorResponse('Failed to check file', 500);
  }
}