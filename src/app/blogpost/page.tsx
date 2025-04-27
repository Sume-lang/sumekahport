"use client";
import { useEffect, useState } from "react";
import { getBlogPost } from "@/context/blogPost";
import { BlogPost } from "@/type/blogpost";
import Link from "next/link";
import { Container } from "@/components/reusable/containers";

export default function BlogPostPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const fetchedPosts = await getBlogPost();
        setBlogPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blogPost:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <Container className="flex flex-col w-full h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86] overflow-hidden border">
      <section className="flex flex-col w-full gap-2 p-10 border">
        <div className="flex flex-wrap gap-2">
          {blogPosts.map((item) => (
            <Link
              href={`blogpost/${item.id}`}
              key={item.id}
              className="p-4 border w-full sm:w-1/2 md:w-1/3"
            >
              <h1 className="font-bold">{item.id}</h1>
              {item.content && (
                <p className="text-sm w-full p-2 h-auto border">{item.content[0]}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
