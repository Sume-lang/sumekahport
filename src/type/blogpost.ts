export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content?: string[];
    date: string;
    modified: string;
    status: 'publish' | 'draft' | 'pending';
    author: {
        name: string;
        email: string;
        url?: string;
    }[];
    categories: string[];
    tags: string[];
    excerpt: string;
    featuredImage?: {
        id: number;
        url: string;
        width: number;
        height: number;
    }[];
    featuredImageAlt?: string;
    featuredImageCaption?: string;
    commentsAllowed?: boolean;
    comments?: {
        id: string;
        author: string;
        content: string;
        date: string;
    }[];
    createAt: any;
    updateAt?: any;
}

