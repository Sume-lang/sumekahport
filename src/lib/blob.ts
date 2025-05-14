// lib/blob.ts
import { put, PutBlobResult } from '@vercel/blob';

export async function uploadFile(file: File): Promise<PutBlobResult> {
  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN!
  });
  return blob;
}

export type UploadedFile = PutBlobResult;