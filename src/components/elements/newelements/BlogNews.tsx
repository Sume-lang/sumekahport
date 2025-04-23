"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dancing_Script } from "next/font/google";
const dancing = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function BlogNews() {
  const [posts, setPosts] = useState<{ title: string; body: string }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=5&_page=1"
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col h-full w-full items-end justify-start p-2">
      <section className="flex flex-col items-end justify-start w-full h-1/2 gap-2 md:px-4 md:py-2">
        <h1
          className={`${dancing.className} text-2xl lg:text-6xl font-bold text-end`}
        >
          See My Latest <span className="text-slate-50">Activity</span>
        </h1>
        <p className="text-sm font-extralight text-end lg:w-1/2 w-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          sapiente esse suscipit facilis nostrum officia natus provident
          repudiandae.
        </p>
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {posts.map((post) => (
          <div
            key={post.body}
            className="rounded-lg p-4 w-full h-full gap-1 hover:bg-slate-600/20 transition duration-200 ease-in-out border-[#faad86]/20 border-[1px] shadow-lg flex flex-col justify-start"
          >
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm font-extralight">{post.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

