"use client";
import Link from "next/link";
import Img from "next/image";
import { useState, useEffect } from "react";

interface Blog {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  author: string | null;
  publishedAt: string;
}

export function Blog() {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/everything?q=tesla&from=2025-03-11&sortBy=publishedAt&apiKey=a47b5f7b6d1843b7bfa62d087d02d5fd",
          { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news");
        console.error("Error fetching news:", error);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <span>
          <Img
            src={"/assets/myprofiles.png"}
            alt="404"
            width={100}
            height={100}
          />
        </span>
        <h1>Sorry, Something went wrong</h1>
        <h2 className="italic text-2xl font-bold">
          We are not able to reach the content now, please try again letter.
        </h2>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="p-4">
        No articles found. Try a different search query.
      </div>
    );
  }

  return (
    <main className="grid lg:grid-cols-3 grid-cols-2 lg:gap-4 gap-1 w-full h-full">
      {articles.slice(0, 10).map((blog, index) => (
        <div
          key={`${blog.url}-${index}`}
          className="rounded-lg p-4 w-full h-full gap-2 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/20 border-[1px] shadow-lg flex flex-col justify-start"
        >
          <h1 className="text-md font-bold">
            {blog.title ? `${blog.title.slice(0, 20)}...` : "Untitled"}
          </h1>
          <article className="text-sm">
            {blog.description || "Sorry, Can't reach the content!!"}
          </article>
          <div className="mt-2 flex flex-row justify-between items-center text-xs">
            <Link
              href={blog.url}
              className="text-[#cabeb9] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Link>
            {blog.author && <span className="">By {blog.author}</span>}
          </div>
        </div>
      ))}
    </main>
  );
}
