"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollMotion from "@/components/reusable/scrollMotion";
import { motion } from "framer-motion";
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
    <ScrollMotion
      className="flex flex-col h-full w-full items-end justify-start p-2 delay-200"
      threshold={0.2}
    >
      <motion.section
        className="flex flex-col items-end justify-start w-full h-1/2 gap-2 md:px-4 md:py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${dancing.className} text-2xl lg:text-6xl font-bold text-end`}
        >
          See My Latest <span className="text-slate-50">Activity</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-extralight text-end lg:w-1/2 w-full"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
          sapiente esse suscipit facilis nostrum officia natus provident
          repudiandae.
        </motion.p>
      </motion.section>
      <motion.section
        className="grid lg:grid-cold-3 grid-cols-3 w-full h-[40vh] gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={post.body}
            className="rounded-lg p-4 w-full h-full gap-1 border-[#faad86]/10 border-[1px] flex flex-col items-start justify-center"
          >
            <motion.h3
              className="text-lg font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {post.title}
            </motion.h3>
            <motion.p
              className="text-sm font-extralight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {post.body}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Read More
            </motion.h3>
          </motion.div>
        ))}
      </motion.section>
    </ScrollMotion>
  );
}
