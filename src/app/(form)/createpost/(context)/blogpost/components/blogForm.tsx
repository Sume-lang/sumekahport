"use client";

import { useState } from "react";
import { createBlogpost } from "@/context/blogPost";
import { BlogPost } from "@/type/blogpost";
import { FaList, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { LetterText } from "lucide-react";
import { FaPencil } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const dancing = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function BlogForm() {
  const [blog, setBlog] = useState<BlogPost>({
    title: "",
    slug: "",
    content: [""],
    date: "",
    modified: "",
    status: "publish",
    author: [],
    categories: [],
    tags: [],
    excerpt: "",
    featuredImage: [],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBlogpost(blog);
      alert("Blog post created successfully!");
      setBlog({
        title: "",
        slug: "",
        content: [""],
        date: "",
        modified: "",
        status: "publish",
        author: [],
        categories: [],
        tags: [],
        excerpt: "",
        featuredImage: [],
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post. Please try again later.");
    }
  };

  const handleChange = (field: keyof BlogPost, value: any) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMoreContent = () => {
    setBlog((prev) => ({
      ...prev,
      content: [...(prev.content ?? []), ""],
    }));
  };

  const handleDeleteContent = (index: number) => {
    setBlog((prev) => ({
      ...prev,
      content: prev.content?.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 p-10 w-full h-auto lg:pt-24"
    >
      <section>
        <h1 className={`${dancing.className} text-2xl lg:text-6xl`}>
          Create Your <span className="text-slate-50">Blog Post</span> Here!!
        </h1>
      </section>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-1/2"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={blog.title}
            placeholder="Title"
            onChange={(e) => handleChange("title", e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="text"
            value={blog.slug}
            placeholder="Slug"
            onChange={(e) => handleChange("slug", e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={blog.date}
            placeholder="Date"
            onChange={(e) => handleChange("date", e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="text"
            value={blog.modified}
            placeholder="Modified"
            onChange={(e) => handleChange("modified", e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={blog.excerpt}
            placeholder="Excerpt"
            onChange={(e) => handleChange("excerpt", e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publish">Publish</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <table className="w-full">
          <tbody>
            {blog.content?.map((res, index) => (
              <tr key={index}>
                <td className="p-2 w-1/12 border-r-[1px] border-[#faad86]/50">
                  <LetterText className="text-[#faad86] text-2xl" />
                </td>
                <td className="p-2 w-full">
                  <Textarea
                    rows={10}
                    placeholder={`Paragraph ${index + 1}`}
                    value={res}
                    onChange={(e) =>
                      setBlog((prev) => ({
                        ...prev,
                        content: prev.content?.map((item, i) =>
                          i === index ? e.target.value : item
                        ),
                      }))
                    }
                    className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
                  />
                </td>
                <td className="p-2 w-1/12">
                  <button
                    type="button"
                    onClick={() => handleDeleteContent(index)}
                    className="flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="p-2">
                <motion.button
                  type="button"
                  onClick={handleAddMoreContent}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 flex items-center"
                >
                  <FaPlusCircle className="mr-1" /> Add more content
                </motion.button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 p-2 bg-[#faad86] text-white rounded-md"
        >
          Submit
        </button>
      </motion.form>
    </motion.main>
  );
}
