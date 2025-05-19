// lib/blob.ts
import { put, del, head, PutBlobResult } from '@vercel/blob';

export type UploadedFile = PutBlobResult;

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf'
];

const getBlobToken = (): string => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set in environment variables');
  }
  return token;
};

const validateFile = (file: File): void => {
  if (!file || !file.name || file.size === 0) {
    throw new Error('Invalid file provided');
  }
  
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }
};

export const uploadFile = async (file: File, folder?: string): Promise<UploadedFile> => {
  try {
    validateFile(file);
    const path = folder ? `${folder}/${Date.now()}_${file.name}` : `${Date.now()}_${file.name}`;
    
    const result = await put(path, file, {
      access: 'public',
      token: getBlobToken(),
      contentType: file.type // Explicitly set content type
    });

    console.log(`Uploaded file to: ${result.url}`); // Debug log
    return result;
  } catch (error) {
    console.error('Error uploading file:', file.name, error);
    throw new Error(`Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const uploadFiles = async (files: File[], folder?: string): Promise<UploadedFile[]> => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided for upload');
    }

    // Pre-validate all files first
    files.forEach(validateFile);

    const results = await Promise.all(
      files.map(file => uploadFile(file, folder))
    );

    console.log(`Successfully uploaded ${results.length} files`);
    return results;
  } catch (error) {
    console.error('Error in batch upload:', error);
    throw error; // Re-throw to let caller handle
  }
};

// File deletion
export const deleteFile = async (url: string): Promise<void> => {
  try {
    if (!url) {
      throw new Error('No URL provided for deletion');
    }
    await del(url, {
      token: getBlobToken()
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Multiple files deletion
export const deleteFiles = async (urls: string[]): Promise<void> => {
  try {
    if (!urls || urls.length === 0) {
      throw new Error('No URLs provided for deletion');
    }
    await Promise.all(urls.map(url => deleteFile(url)));
  } catch (error) {
    console.error('Error deleting files:', error);
    throw new Error(`Failed to delete files: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Check if file exists
export const fileExists = async (url: string): Promise<boolean> => {
  try {
    if (!url) return false;
    await head(url, { token: getBlobToken() });
    return true;
  } catch {
    return false;
  }
};

// Generate file path without uploading (useful for pre-validation)
export const generateFilePath = (file: File, folder?: string): string => {
  validateFile(file);
  return folder ? `${folder}/${Date.now()}_${file.name}` : `${Date.now()}_${file.name}`;
};

// Extract filename from URL
export const getFilenameFromUrl = (url: string): string => {
  try {
    return new URL(url).pathname.split('/').pop() || '';
  } catch {
    return '';
  }
};