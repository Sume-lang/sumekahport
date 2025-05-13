export interface newsBlog {
    id?: string,
    title: string,
    overview: string,
    contens: subNews[],
    date: string,
    modified: string,
    status: 'publish' | 'draft' | 'pending',
    author: Author[],
    coverImage: string,
    contentImage: string,
    categories: categories[],
    tags: string
    comments: comments[]
    createAt: string,
    updateAt: string,
    published:boolean
}
export interface comments{
    id?: string,
    username: string,
    email:string,
    subject: string,
    content:string,
}
export interface categories {
    id?: string;
    title: string
}
export interface Author{
    id?: string,
    name: string,
    emai: string,
    img:string,
}
export interface subNews {
    id?: string,
    title: string,
    news:string
}
