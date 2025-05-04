import { getBlogPostById, getBlogPost } from "@/context/blogPost";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Publication status badge */}
      {post.status !== "publish" && (
        <div className="mb-4 inline-block px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          {post.status.toUpperCase()}
        </div>
      )}

      <header className="mb-10">
        {/* Categories and Dates */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span key={category} className="hover:text-blue-600">
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
          {post.title}
        </h1>

        {/* Authors */}
        <div className="flex flex-col gap-2 mt-6">
          {post.author.map((author) => (
            <div key={author.email} className="flex items-center gap-3">
              {author.url ? (
                <a href={author.url} className="flex items-center gap-3 group">
                  <span className="font-medium text-gray-900 group-hover:text-blue-600">
                    {author.name}
                  </span>
                </a>
              ) : (
                <span className="font-medium text-gray-900">{author.name}</span>
              )}
            </div>
          ))}
        </div>
      </header>

      {/* Featured Image */}
   

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content?.map((block, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: block }}
            className="mb-6 last:mb-0"
          />
        ))}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const post = await getBlogPostById(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images:
        post.featuredImage?.map((img) => ({
          url: img.url,
          width: img.width,
          height: img.height,
          alt: post.featuredImageAlt || post.title,
        })) || [],
      type: "article",
      authors: post.author.map((a) => a.name),
      tags: post.tags,
    },
    keywords: post.tags.join(", "),
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPost(); // Use your get all posts function
  return posts.map((post) => ({
    id: post.id!,
  }));
}

export const revalidate = 3600; // Revalidate data every hour
