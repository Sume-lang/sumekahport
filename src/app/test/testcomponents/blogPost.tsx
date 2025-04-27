import { getBlogPost } from "@/context/blogPost";

export default async function BlogPost() {
    const blogPosts = await getBlogPost();
    return (
        <main className="flex w-full pr-20 pl-20 items-center justify-center h-screen">
            <section className="flex flex-col w-full border gap-2">
                {blogPosts.map((item) => (
                    <div key={item.id} className="p-4 w-full border box-content">
                        <h1 className="font-bold">{item.title}</h1>
                        <p className="text-sm w-full">{item.content}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}