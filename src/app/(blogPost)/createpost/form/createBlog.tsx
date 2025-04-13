"use client";
import { useState, useEffect } from "react";
import { createBlogpost } from "@/context/blogPost";

interface BlogPostData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  modified: string;
  status: "publish" | "draft" | "pending";
  author: {
    name: string;
    email: string;
    url?: string;
  };
  categories: string[];
  tags: string[];
  excerpt: string;
  featuredImage?: {
    id: number;
    url: string;
    width: number;
    height: number;
  };
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  commentsAllowed?: boolean;
  comments?: {
    id: string;
    author: string;
    content: string;
    date: string;
  }[];
}

const CreateBlogForm = () => {
  const [postData, setPostData] = useState<BlogPostData>({
    title: "",
    slug: "",
    content: "",
    date: new Date().toISOString(),
    modified: new Date().toISOString(),
    status: "draft",
    author: {
      name: "",
      email: "",
    },
    categories: [],
    tags: [],
    excerpt: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBlogpost(postData);
      alert("Blog post created successfully!");
      clearForm();
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post. Please try again later.");
    }
  };

  const clearForm = () => {
    setPostData({
      title: "",
      slug: "",
      content: "",
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      status: "draft",
      author: {
        name: "",
        email: "",
      },
      categories: [],
      tags: [],
      excerpt: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={postData.title}
        onChange={(e) =>
          setPostData((prevState) => ({ ...prevState, title: e.target.value }))
        }
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Slug"
        value={postData.slug}
        onChange={(e) =>
          setPostData((prevState) => ({ ...prevState, slug: e.target.value }))
        }
        required
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Content"
        value={postData.content}
        onChange={(e) =>
          setPostData((prevState) => ({
            ...prevState,
            content: e.target.value,
          }))
        }
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Author Name"
        value={postData.author.name}
        onChange={(e) =>
          setPostData((prevState) => ({
            ...prevState,
            author: {
              ...postData.author,
              name: e.target.value,
            },
          }))
        }
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Author Email"
        value={postData.author.email}
        onChange={(e) =>
          setPostData((prevState) => ({
            ...prevState,
            author: {
              ...postData.author,
              email: e.target.value,
            },
          }))
        }
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Author URL"
        value={postData.author.url || ""}
        onChange={(e) =>
          setPostData((prevState) => ({
            ...prevState,
            author: {
              ...postData.author,
              url: e.target.value,
            },
          }))
        }
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Create Blog Post
      </button>
    </form>
  );
};

export default CreateBlogForm;
