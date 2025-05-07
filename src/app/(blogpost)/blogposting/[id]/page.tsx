import { getByIdBlogpost } from "@/context/blogPost";
export default async function BlogPostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogPost = await getByIdBlogpost(id);

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <main>
      <section>
        <h1 className="text-3xl font-bold">{blogPost.title}</h1>
        {blogPost.content &&
          blogPost.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </section>
    </main>
  );
}
