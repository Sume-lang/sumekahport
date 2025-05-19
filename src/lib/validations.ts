// lib/validators/blob.ts
interface ValidationResult {
    valid: boolean;
    error?: string;
  }
  
  export const validateFileSize = (file: File, maxSize: number): ValidationResult => {
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`
      };
    }
    return { valid: true };
  };
  
  export const validateFileType = (
    file: File,
    allowedTypes: string[]
  ): ValidationResult => {
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }
    return { valid: true };
  };
  
  export const validateFileName = (
    file: File,
    maxLength = 100
  ): ValidationResult => {
    const fileName = file.name;
    if (fileName.length > maxLength) {
      return {
        valid: false,
        error: `File name exceeds ${maxLength} character limit`
      };
    }
  
    // Prevent directory traversal and special characters
    const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
    if (invalidChars.test(fileName)) {
      return {
        valid: false,
        error: 'File name contains invalid characters'
      };
    }
  
    return { valid: true };
  };
  
  export const validateFile = async (
    file: File,
    options: {
      maxSize?: number;
      allowedTypes?: string[];
      maxNameLength?: number;
    } = {}
  ): Promise<ValidationResult> => {
    const defaultOptions = {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf'
      ],
      maxNameLength: 100
    };
  
    const { maxSize, allowedTypes, maxNameLength } = {
      ...defaultOptions,
      ...options
    };
  
    // Basic checks
    if (!file) return { valid: false, error: 'No file provided' };
    if (file.size === 0) return { valid: false, error: 'File is empty' };
  
    // Run validations
    const sizeValidation = validateFileSize(file, maxSize);
    if (!sizeValidation.valid) return sizeValidation;
  
    const typeValidation = validateFileType(file, allowedTypes);
    if (!typeValidation.valid) return typeValidation;
  
    const nameValidation = validateFileName(file, maxNameLength);
    if (!nameValidation.valid) return nameValidation;
  
    // Additional security checks
    if (file.name.startsWith('.')) {
      return { valid: false, error: 'Hidden files are not allowed' };
    }
  
    // For images, you could add actual content verification
    // using sharp or similar library
  
    return { valid: true };
  };