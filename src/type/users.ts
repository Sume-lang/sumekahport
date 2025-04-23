export interface User { 
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    isActive: boolean;
    isVerified: boolean;
    profilePicture?: string;
    bio?: string;
}