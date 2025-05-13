export interface Users {
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


export interface Employees {
    id: string;
    name: string;
    email: string;
    password: string;
    position: string;
    experience: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    isActive: boolean;
    isVerified: boolean;
    profilePicture?: string;
    bio?: string;
}