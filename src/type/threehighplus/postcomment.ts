export interface comment {
    id?: string
    username: string
    email:string
    subject: string
    content: string
    feedback: feedback[],
}

export interface feedback {
    id?: string,
    star: number
}