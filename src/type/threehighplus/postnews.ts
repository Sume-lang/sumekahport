export interface newsBlog {
    id?: string;
    title: string;
    overview: string;
    content: subNews[];
    date: string;
    modified: string;
    status: 'publish' | 'draft' | 'pending';
    author: Author[];
    coverImageUrl: string | null;
    contentImage: string | string[];
    categories: categories[];
    tags: string;
    comments: comments[];
    createdAt: string;
    updatedAt: string;
    published: boolean;
    featured?: boolean;
}

export interface comments {
    id?: string;
    username: string;
    email: string;
    subject: string;
    content: string;
}

export interface categories {
    id?: string;
    title: string;
}

export interface Author {
    id?: string;
    name: string;
    email: string;
    img: string;
}

export interface subNews {
    id?: string;
    title: string;
    news: string;
}