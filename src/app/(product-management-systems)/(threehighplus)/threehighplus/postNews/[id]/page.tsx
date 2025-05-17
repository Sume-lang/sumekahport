import React from "react";
import { getBlogPostById } from "@/context/threehighplus/getBlogNews";
import Image from "next/image";

export default async function BlogPostDetails({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { id } = params;
    const blogPost = await getBlogPostById(id);

    if (!blogPost) {
      return (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-lg text-gray-600">
              The requested blog post could not be found.
            </p>
          </div>
        </div>
      );
    }

    return (
      <main className="min-h-screen w-full">
        {/* Hero Section with Cover Image */}
        <section className="relative h-[60vh] w-full">
          {blogPost.coverImageUrl ? (
            <>
              {/* Background Image with fallback */}
              <div className="absolute inset-0">
                <Image
                  src={blogPost.coverImageUrl}
                  alt={blogPost.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover"
                  priority
                  quality={80}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030E36]/90 to-[#00163B]/10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-200" />
          )}

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-10">
            <h1 className="text-3xl lg:text-5xl font-light text-white">
              Welcome to Our{" "}
              <span className="text-slate-300 font-bold">Blog</span>
            </h1>
            <h1 className="lg:text-5xl text-2xl font-bold text-white">
              {blogPost.title}
            </h1>
            {blogPost.overview && (
              <p className="text-lg text-white mt-4 max-w-3xl">
                {blogPost.overview}
              </p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="container p-5 pl-20 w-full h-auto">
          {blogPost.contens?.length > 0 ? (
            blogPost.contens.map((paragraph, index) => (
              <div key={`${paragraph.id || index}`} className="mb-2">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {paragraph.title}
                </h2>
                <p className="text-lg text-gray-700 whitespace-pre-line">
                  {paragraph.news}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">
                No content available for this blog post.
              </p>
            </div>
          )}

          {/* Display content images if they exist */}
          {blogPost.contentImage && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Related Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(blogPost.contentImage) ? (
                  blogPost.contentImage.map((imageUrl, idx) => (
                    <div
                      key={idx}
                      className="relative h-64 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Content image ${idx + 1}`}
                        fill
                        className="object-cover"
                        quality={75}
                      />
                    </div>
                  ))
                ) : (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={blogPost.contentImage}
                      alt="Content image"
                      fill
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
  }

  {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error Loading Blog Post
          </h1>
          <p className="text-lg text-gray-600">
            An error occurred while loading the blog post. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }
}
