"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiChevronDown,
  FiUpload,
} from "react-icons/fi";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
} from "@/context/threehighplus/getBlogNews";
import { newsBlog, Author, subNews } from "@/type/threehighplus/postnews";
import Img from "next/image";

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
    setValue,
    watch,
  } = useForm<newsBlog>({
    defaultValues: initialData || {
      title: "",
      overview: "",
      contens: [],
      status: "draft",
      author: [],
      categories: [],
      tags: "",
      coverImageUrl: "",
      contentImage: [],
    },
  });

  const [contents, setContents] = useState<subNews[]>(
    initialData?.contens || []
  );
  const [authors, setAuthors] = useState<Author[]>(initialData?.author || []);
  const [posts, setPosts] = useState<newsBlog[]>([]);
  const [isEditing, setIsEditing] = useState(!!initialData);
  const [isUploading, setIsUploading] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [contentImagesPreview, setContentImagesPreview] = useState<string[]>(
    []
  );

  const contentImage = watch("contentImage");

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllBlogPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setContents(initialData.contens || []);
      setAuthors(initialData.author || []);
      setCoverImagePreview(initialData.coverImageUrl || null);
      setContentImagesPreview(
        Array.isArray(initialData.contentImage)
          ? initialData.contentImage
          : initialData.contentImage
          ? [initialData.contentImage]
          : []
      );
      setIsEditing(true);
    }
  }, [initialData, reset]);

  // Content management
  const addContent = () => setContents([...contents, { title: "", news: "" }]);
  const removeContent = (index: number) =>
    setContents(contents.filter((_, i) => i !== index));

  // Author management
  const addAuthor = () =>
    setAuthors([...authors, { name: "", email: "", img: "" }]);
  const removeAuthor = (index: number) =>
    setAuthors(authors.filter((_, i) => i !== index));

  const handleEdit = (post: newsBlog) => {
    reset(post);
    setContents(post.contens || []);
    setAuthors(post.author || []);
    setCoverImagePreview(post.coverImageUrl || null);
    setContentImagesPreview(
      Array.isArray(post.contentImage)
        ? post.contentImage
        : post.contentImage
        ? [post.contentImage]
        : []
    );
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const post = posts.find((p) => p.id === id);
      if (post) {
        // Delete associated images
        if (post.coverImageUrl) {
          await fetch("/api/postnews/blob", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: post.coverImageUrl }),
          });
        }

        if (post.contentImage) {
          const imagesToDelete = Array.isArray(post.contentImage)
            ? post.contentImage
            : [post.contentImage];

          await Promise.all(
            imagesToDelete.map((url) =>
              fetch("/api/postnews/blob", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
              })
            )
          );
        }
      }

      await deleteBlogPost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "post_covers");

      const response = await fetch("/api/postnews/blob", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blobData = await response.json();
      setValue("coverImageUrl", blobData.url);
      setCoverImagePreview(blobData.url);
    } catch (error) {
      console.error("Error uploading cover image:", error);
      alert("Failed to upload cover image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "content_images");

        const response = await fetch("/api/postnews/blob", {
          method: "POST",
          body: formData,
        });
        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      const newUrls = results.map((r) => r.url);

      const updatedUrls = Array.isArray(contentImage)
        ? [...contentImage, ...newUrls]
        : contentImage
        ? [contentImage, ...newUrls]
        : [...newUrls];

      setValue("contentImage", updatedUrls);
      setContentImagesPreview(updatedUrls);
    } catch (error) {
      console.error("Error uploading content images:", error);
      alert("Failed to upload content images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeContentImage = async (url: string) => {
    try {
      await fetch("/api/postnews/blob", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const updated = Array.isArray(contentImage)
        ? contentImage.filter((u) => u !== url)
        : [contentImage].filter((u) => u !== url);

      setValue("contentImage", updated);
      setContentImagesPreview(updated);
    } catch (error) {
      console.error("Error removing content image:", error);
      alert("Failed to remove image");
    }
  };

  const onSubmit = async (data: newsBlog) => {
    try {
      setIsUploading(true);

      // Prepare base post data without auto-generated fields
      const postData: Omit<newsBlog, "id" | "createdAt" | "updatedAt"> = {
        ...data,
        title: data.title,
        overview: data.overview,
        status: data.status,
        tags: data.tags,
        categories: data.categories,
        contens: contents,
        author: authors,
      };

      if (isEditing && initialData?.id) {
        // For updates, we need to handle image changes carefully
        const coverInput = document.querySelector(
          'input[name="coverImage"]'
        ) as HTMLInputElement;
        const contentInput = document.querySelector(
          'input[name="contentImages"]'
        ) as HTMLInputElement;

        const newCoverImage = coverInput?.files?.[0] || null;
        const newContentImages = contentInput?.files?.length
          ? Array.from(contentInput.files)
          : [];

        const result = await updateBlogPost({
          id: initialData.id,
          postData,
          newCoverImage: newCoverImage,
          contentImagesToRemove: getRemovedImages(
            initialData.contentImage,
            contentImage
          ),
          newContentImages: newContentImages,
        });

        if (!result.success) {
          throw new Error(result.error || "Failed to update post");
        }
      } else {
        // For new posts, get all uploaded files
        const coverInput = document.querySelector(
          'input[name="coverImage"]'
        ) as HTMLInputElement;
        const contentInput = document.querySelector(
          'input[name="contentImages"]'
        ) as HTMLInputElement;

        const coverImage = coverInput?.files?.[0] || null;
        const contentImages = contentInput?.files?.length
          ? Array.from(contentInput.files)
          : [];

        const newPost = await createBlogPost({
          postData,
          coverImage,
          contentImages,
        });

        if (!newPost.id) {
          throw new Error("Failed to create post");
        }
      }

      // Reset form and state
      reset();
      setContents([]);
      setAuthors([]);
      setCoverImagePreview(null);
      setContentImagesPreview([]);
      setIsEditing(false);
      onSuccess?.();

      // Refresh posts list
      const updatedPosts = await getAllBlogPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error saving post:", error);
      alert(error instanceof Error ? error.message : "Failed to save post");
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to find removed images
  function getRemovedImages(
    oldContentImage: string | string[] | undefined,
    newContentImage: string | string[] | undefined
  ): string[] {
    const oldImages = Array.isArray(oldContentImage)
      ? oldContentImage
      : oldContentImage
      ? [oldContentImage]
      : [];

    const newImages = Array.isArray(newContentImage)
      ? newContentImage
      : newContentImage
      ? [newContentImage]
      : [];

    return oldImages.filter((url) => !newImages.includes(url));
  }

  // Rest of your JSX remains the same...
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      exit={{ opacity: 0 }}
    >
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
            disabled={isSubmitting || isUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : isUploading
              ? "Uploading..."
              : "Save Post"}
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
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Cover Image
                </label>
                {coverImagePreview ? (
                  <div className="relative group">
                    <Img
                      src={coverImagePreview}
                      alt="Cover preview"
                      width={500}
                      height={500}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Remove Cover Image"
                        type="button"
                        onClick={() => {
                          setValue("coverImageUrl", "");
                          setCoverImagePreview(null);
                        }}
                        className="text-white bg-red-500 rounded-full p-2 hover:bg-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer bg-slate-750 hover:bg-slate-700 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-3 text-slate-400" />
                      <p className="text-sm text-slate-400">
                        Upload Cover Image
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                      name="coverImage"
                    />
                  </label>
                )}
                <input type="hidden" {...register("coverImageUrl")} />
              </div>

              {/* Content Images */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Content Images
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {contentImagesPreview.map((url, index) => (
                    <div key={index} className="relative group">
                      <Img
                        src={url}
                        alt={`Content ${index + 1}`}
                        width={500}
                        height={500}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="Remove Content Image"
                          type="button"
                          onClick={() => removeContentImage(url)}
                          className="text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer bg-slate-750 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center justify-center pt-3 pb-4">
                    <FiPlus className="w-5 h-5 mr-2 text-slate-400" />
                    <p className="text-sm text-slate-400">Add Content Images</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleContentImagesUpload}
                    className="hidden"
                    multiple
                    name="contentImages"
                  />
                </label>
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
                      value={author.email}
                      onChange={(e) => {
                        const updated = [...authors];
                        updated[index].email = e.target.value;
                        setAuthors(updated);
                      }}
                      placeholder="Email"
                      className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove Author"
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
                    <Link href={`/threehighplus/postNews/${post.id}`}>
                      {post.title}
                    </Link>
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
                        aria-label="Edit Post"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete Post"
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
    </motion.div>
  );
}
