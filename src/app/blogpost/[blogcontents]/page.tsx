import { getBlogPostById } from "@/context/blogPost";
import { BlogPost } from "@/type/blogpost";

interface BlogPostPageProps {
  params: { blogcontents: string };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const blogPostId = params.blogcontents;
  const blogPost = await getBlogPostById(blogPostId);

  if (!blogPost?.content) {
    return <div>Blog post not found</div>;
  }

  return (
    <main className="flex w-full pr-20 pl-20 items-center justify-center h-auto p-10 overflow-y-auto">
      <section className="flex flex-col w-1/4 h-auto border gap-2 p-10">
        <h1 className="font-bold">{blogPost.title}</h1>
        <p>{blogPost.excerpt}</p>
        {blogPost.content?.map((paragraph, index) => (
          <div key={index} className="p-2 h-auto text-start">
            <p className="text-sm">
              content: <span>-</span>
              {paragraph}
            </p>
          </div>
        ))}
        <p>Published: {blogPost.date}</p>
        <p>Modified: {blogPost.modified}</p>
      </section>
    </main>
  );
};

export default BlogPostPage;
