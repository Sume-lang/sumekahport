import { getBlogPost } from "@/context/blogPost";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getBlogPost();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <Link href={`/blogposting/${post.id}`} className="group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-700 mb-3">{post.excerpt}</p>
            <div className="flex gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
