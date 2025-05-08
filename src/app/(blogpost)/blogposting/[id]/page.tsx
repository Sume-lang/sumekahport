import { getByIdBlogpost } from "@/context/blogPost";
export default async function BlogPostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogPost = await getByIdBlogpost(id);

  if (!blogPost) {
    return <div>Sorry, Blog post not found</div>;
  }

  return (
    <main className="h-screen w-full p-20">
      <section className="w-1/3 border">
        <h1 className="text-3xl font-bold">{blogPost.title}</h1>
        {blogPost.content &&
          blogPost.content.map((paragraph, index) => (
            <p className="" key={index}>
              {paragraph}
            </p>
          ))}
      </section>
    </main>
  );
}
