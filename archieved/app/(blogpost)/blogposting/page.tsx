import { getBlogPost } from "@/context/blogPost";
import Link from "next/link";
export default async function BlogPost() {
  const blogPost = await getBlogPost();

  return (
    <main>
      <section>
        {blogPost.map((post) => (
          <Link key={post.id} href={`/blogposting/${post.id}`}>
            <h1>{post.title}</h1>
          </Link>
        ))}
      </section>
    </main>
  );
}
