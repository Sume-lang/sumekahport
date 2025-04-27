export interface Cms {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    modified: string;
    status: "publish" | "draft" | "pending";
    author: {
        name: string;
        email: string;
        url?: string;
    }[];
    name: string;
    email: string;
    url?: string;
    categories: string[];
    tags: string[];
    excerpt: string;
    featuredImage?: {
        id: number;
        url: string;
        width: number;
        height: number;
    }[];
    createAt: string;
    updateAt: string;
}
