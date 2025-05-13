"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash2, FiEdit2, FiChevronDown } from "react-icons/fi";
import {
  createPostNews,
  getAllPostNews,
  updatePostNews,
  deletePostNews,
} from "@/context/threehighplus/getBlogNews";
import { newsBlog, Author, subNews } from "@/type/threehighplus/postnews";

interface NewsPostFormProps {
  initialData?: newsBlog;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NewsPostForm({
  initialData,
  onSuccess,
  onCancel,
}: NewsPostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<newsBlog>({
    defaultValues: initialData || {
      title: "",
      overview: "",
      contens: [],
      status: "draft",
      author: [],
      categories: [],
      tags: "",
      coverImage: "",
      contentImage: "",
    },
  });

  const [contents, setContents] = useState<subNews[]>(
    initialData?.contens || []
  );
  const [authors, setAuthors] = useState<Author[]>(initialData?.author || []);
  const [posts, setPosts] = useState<newsBlog[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPostNews();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Content management
  const addContent = () => setContents([...contents, { title: "", news: "" }]);
  const removeContent = (index: number) =>
    setContents(contents.filter((_, i) => i !== index));

  // Author management
  const addAuthor = () =>
    setAuthors([...authors, { name: "", emai: "", img: "" }]);
  const removeAuthor = (index: number) =>
    setAuthors(authors.filter((_, i) => i !== index));

  const handleEdit = (post: newsBlog) => {
    reset(post);
    setContents(post.contens || []);
    setAuthors(post.author || []);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    await deletePostNews(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const onSubmit = async (data: newsBlog) => {
    const postData = {
      ...data,
      contens: contents,
      author: authors,
    };

    if (isEditing && initialData?.id) {
      await updatePostNews(initialData.id, postData);
    } else {
      await createPostNews(postData);
    }

    reset();
    setContents([]);
    setAuthors([]);
    setIsEditing(false);
    onSuccess?.();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-200">
          {isEditing ? "Edit Post" : "Create Post"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="px-4 py-2 border border-slate-600 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            aria-label="Save post"
            form="post-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form
        id="post-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-2">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter post title"
              className="w-full bg-transparent text-xl font-medium text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Overview */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-2">
            <textarea
              {...register("overview", { required: "Overview is required" })}
              placeholder="Write a short overview..."
              rows={4}
              className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
            />
            {errors.overview && (
              <p className="mt-1 text-sm text-red-500">
                {errors.overview.message}
              </p>
            )}
          </div>

          {/* Content Sections */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-slate-300">Content Sections</h2>
              <button
                type="button"
                onClick={addContent}
                aria-label="Add Section"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus /> Add Section
              </button>
            </div>

            <div className="space-y-4">
              {contents.map((content, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-750 border border-slate-700 rounded-lg p-4"
                >
                  <input
                    value={content.title}
                    onChange={(e) => {
                      const updated = [...contents];
                      updated[index].title = e.target.value;
                      setContents(updated);
                    }}
                    placeholder="Section title"
                    className="w-full bg-transparent font-medium text-slate-200 mb-3 placeholder-slate-500 focus:outline-none"
                  />
                  <textarea
                    value={content.news}
                    onChange={(e) => {
                      const updated = [...contents];
                      updated[index].news = e.target.value;
                      setContents(updated);
                    }}
                    placeholder="Write your content here..."
                    rows={5}
                    className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
                  />
                  <button
                    type="button"
                    aria-label="Remove Section"
                    onClick={() => removeContent(index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="font-medium text-slate-300 mb-3">Status</h2>
            <div className="relative">
              <select
                {...register("status")}
                className="appearance-none w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="draft" className="bg-slate-800">
                  Draft
                </option>
                <option value="publish" className="bg-slate-800">
                  Publish
                </option>
                <option value="pending" className="bg-slate-800">
                  Pending
                </option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* Media */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="font-medium text-slate-300 mb-3">Media</h2>
            <div className="space-y-4">
              <div>
                <input
                  {...register("coverImage")}
                  placeholder="Cover image URL"
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  {...register("contentImage")}
                  placeholder="Content image URL"
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Authors */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium text-slate-300">Authors</h2>
              <button
                type="button"
                onClick={addAuthor}
                aria-label="Add Author"
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-slate-750 rounded-md p-3"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      value={author.name}
                      onChange={(e) => {
                        const updated = [...authors];
                        updated[index].name = e.target.value;
                        setAuthors(updated);
                      }}
                      placeholder="Name"
                      className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none"
                    />
                    <input
                      value={author.emai}
                      onChange={(e) => {
                        const updated = [...authors];
                        updated[index].emai = e.target.value;
                        setAuthors(updated);
                      }}
                      placeholder="Email"
                      className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove Section"
                    onClick={() => removeAuthor(index)}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="font-medium text-slate-300 mb-3">Tags</h2>
            <input
              {...register("tags")}
              placeholder="Comma separated tags"
              className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </form>

      {/* Posts Table */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">
          Your Posts
        </h2>
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-750">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        post.status === "publish"
                          ? "bg-green-900 text-green-300"
                          : post.status === "draft"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        aria-label="Edit Section"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        aria-label="Remove Section"
                        onClick={() => handleDelete(post.id!)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
