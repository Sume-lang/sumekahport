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
  FiLoader,
} from "react-icons/fi";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogNews,
} from "@/context/threehighplus/getBlogNews";
import {
  newsBlog,
  Author,
  subNews,
  categories,
} from "@/type/threehighplus/postnews";
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
      content: [],
      date: new Date().toISOString().split("T")[0],
      modified: new Date().toISOString().split("T")[0],
      status: "draft",
      author: [],
      categories: [],
      tags: "",
      coverImageUrl: null,
      contentImage: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false,
    },
  });

  const [contents, setContents] = useState<subNews[]>(
    initialData?.content || []
  );
  const [authors, setAuthors] = useState<Author[]>(initialData?.author || []);
  const [categoryList, setCategoryList] = useState<categories[]>(
    initialData?.categories || []
  );
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
    if (initialData) {
      reset(initialData);
      setContents(initialData.content || []);
      setAuthors(initialData.author || []);
      setCategoryList(initialData.categories || []);
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

    // Load existing posts
    const loadPosts = async () => {
      const result = await getBlogNews({ statusFilter: "all" });
      if (result.success && result.data) {
        setPosts(result.data);
      }
    };
    loadPosts();
  }, [initialData, reset]);

  // Content management
  const addContent = () =>
    setContents([
      ...contents,
      { id: Date.now().toString(), title: "", news: "" },
    ]);
  const updateContent = (
    index: number,
    field: keyof subNews,
    value: string
  ) => {
    const updated = [...contents];
    updated[index] = { ...updated[index], [field]: value };
    setContents(updated);
  };
  const removeContent = (index: number) =>
    setContents(contents.filter((_, i) => i !== index));

  // Author management
  const addAuthor = () =>
    setAuthors([
      ...authors,
      { id: Date.now().toString(), name: "", email: "", img: "" },
    ]);
  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const updated = [...authors];
    updated[index] = { ...updated[index], [field]: value };
    setAuthors(updated);
  };
  const removeAuthor = (index: number) =>
    setAuthors(authors.filter((_, i) => i !== index));

  // Category management
  const addCategory = () =>
    setCategoryList([
      ...categoryList,
      { id: Date.now().toString(), title: "" },
    ]);
  const updateCategory = (index: number, value: string) => {
    const updated = [...categoryList];
    updated[index].title = value;
    setCategoryList(updated);
  };
  const removeCategory = (index: number) =>
    setCategoryList(categoryList.filter((_, i) => i !== index));

  const handleEdit = (post: newsBlog) => {
    reset(post);
    setContents(post.content || []);
    setAuthors(post.author || []);
    setCategoryList(post.categories || []);
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
      const result = await deleteBlogPost(id);
      if (result.success) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw new Error(result.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(error instanceof Error ? error.message : "Failed to delete post");
    }
  };
  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get files from input
    const files = e.target.files;

    // Explicit null check
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    const file = files[0];

    try {
      setIsUploading(true);

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG, or WebP images are allowed");
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(`File too large (max ${maxSize / 1024 / 1024}MB)`);
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "post_covers");

      const response = await fetch("/api/blob", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();

      // Handle response
      const imageUrl = result.url;
      if (!imageUrl) throw new Error("No URL returned from upload");

      setValue("coverImageUrl", imageUrl, { shouldValidate: true });
      setCoverImagePreview(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      // Reset input
      if (e.target) e.target.value = "";
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
      const formData = new FormData();

      // Validate files before upload
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      files.forEach((file) => {
        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            `Invalid file type: ${file.name}. Only JPEG, PNG, or WebP allowed.`
          );
        }
        if (file.size > maxSize) {
          throw new Error(
            `File too large: ${file.name} (max ${maxSize / 1024 / 1024}MB)`
          );
        }
        formData.append("files", file);
      });

      formData.append("folder", "content_images");

      const response = await fetch("/api/blob", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const results = await response.json();

      // Type-safe response handling
      const newUrls = results.map((result: { url: string }) => {
        if (!result.url) throw new Error("Invalid response format");
        return result.url;
      });

      // Merge with existing images
      const currentUrls = Array.isArray(contentImage)
        ? contentImage
        : contentImage
        ? [contentImage]
        : [];

      const updatedUrls = [...currentUrls, ...newUrls];

      setValue("contentImage", updatedUrls, { shouldValidate: true });
      setContentImagesPreview(updatedUrls);
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      // Reset input to allow re-upload
      if (e.target) e.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const removeContentImage = async (url: string) => {
    try {
      const response = await fetch("/api/blob", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      const updated = contentImagesPreview.filter((u) => u !== url);
      setValue("contentImage", updated.length === 1 ? updated[0] : updated, {
        shouldValidate: true,
      });
      setContentImagesPreview(updated);
    } catch (error) {
      console.error("Deletion error:", error);
      alert("Failed to remove image");
    }
  };

  const onSubmit = async (data: newsBlog) => {
    try {
      setIsUploading(true);

      // Prepare the complete post data
      const postData = {
        ...data,
        content: contents,
        author: authors,
        categories: categoryList,
        published: data.status === "publish",
        updatedAt: new Date().toISOString(),
        ...(!isEditing && { createdAt: new Date().toISOString() }),
      };

      if (isEditing && initialData?.id) {
        // Handle update
        const coverInput = document.querySelector(
          'input[name="coverImage"]'
        ) as HTMLInputElement;
        const contentInput = document.querySelector(
          'input[name="contentImages"]'
        ) as HTMLInputElement;

        const result = await updateBlogPost({
          id: initialData.id,
          postData,
          newCoverImage: coverInput?.files?.[0] || null,
          contentImagesToRemove: getRemovedImages(
            initialData.contentImage,
            contentImage
          ),
          newContentImages: contentInput?.files
            ? Array.from(contentInput.files)
            : [],
        });

        if (!result.success) throw new Error(result.error || "Update failed");

        // Update local state
        if (result.data) {
          setPosts(
            posts.map((p) => (p.id === initialData.id ? result.data! : p))
          );
        }
      } else {
        // Handle create
        const coverInput = document.querySelector(
          'input[name="coverImage"]'
        ) as HTMLInputElement;
        const contentInput = document.querySelector(
          'input[name="contentImages"]'
        ) as HTMLInputElement;

        const result = await createBlogPost({
          postData,
          coverImage: coverInput?.files?.[0] || null,
          contentImages: contentInput?.files
            ? Array.from(contentInput.files)
            : [],
        });

        if (!result.success || !result.data) throw new Error("Creation failed");

        // Update local state
        setPosts([result.data, ...posts]);
      }

      // Reset form on success
      if (!isEditing) {
        reset();
        setContents([]);
        setAuthors([]);
        setCategoryList([]);
        setCoverImagePreview(null);
        setContentImagesPreview([]);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving post:", error);
      alert(error instanceof Error ? error.message : "Failed to save post");
    } finally {
      setIsUploading(false);
    }
  };

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
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-200">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-600 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
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
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
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
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
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
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus /> Add Section
              </button>
            </div>

            <div className="space-y-4">
              {contents.map((content, index) => (
                <div
                  key={content.id || index}
                  className="group relative bg-slate-750 border border-slate-700 rounded-lg p-4"
                >
                  <input
                    value={content.title}
                    onChange={(e) =>
                      updateContent(index, "title", e.target.value)
                    }
                    placeholder="Section title"
                    className="w-full bg-transparent font-medium text-slate-200 mb-3 placeholder-slate-500 focus:outline-none"
                  />
                  <textarea
                    value={content.news}
                    onChange={(e) =>
                      updateContent(index, "news", e.target.value)
                    }
                    placeholder="Write your content here..."
                    rows={5}
                    className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
                  />
                  <button
                    type="button"
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
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
                <option value="pending">Pending</option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* Dates */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="font-medium text-slate-300 mb-3">Dates</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Publish Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Modified Date
                </label>
                <input
                  type="date"
                  {...register("modified")}
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="font-medium text-slate-300 mb-3">Media</h2>
            <div className="space-y-4">
              {/* Cover Image */}
              <div>
                {coverImagePreview ? (
                  <div className="relative group mb-4">
                    <Img
                      src={coverImagePreview}
                      alt="Cover preview"
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("coverImageUrl", null);
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
                      {isUploading ? (
                        <FiLoader className="w-8 h-8 mb-3 text-slate-400 animate-spin" />
                      ) : (
                        <FiUpload className="w-8 h-8 mb-3 text-slate-400" />
                      )}
                      <p className="text-sm text-slate-400">
                        {isUploading ? "Uploading..." : "Upload Cover Image"}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                      name="coverImage"
                      disabled={isUploading}
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
                        width={200}
                        height={200}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
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
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {authors.map((author, index) => (
                <div
                  key={author.id || index}
                  className="flex items-center gap-3 bg-slate-750 rounded-md p-3"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      value={author.name}
                      onChange={(e) =>
                        updateAuthor(index, "name", e.target.value)
                      }
                      placeholder="Name"
                      className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none"
                    />
                    <input
                      value={author.email}
                      onChange={(e) =>
                        updateAuthor(index, "email", e.target.value)
                      }
                      placeholder="Email"
                      className="w-full bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium text-slate-300">Categories</h2>
              <button
                type="button"
                onClick={addCategory}
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {categoryList.map((category, index) => (
                <div
                  key={category.id || index}
                  className="flex items-center gap-3 bg-slate-750 rounded-md p-3"
                >
                  <input
                    value={category.title}
                    onChange={(e) => updateCategory(index, e.target.value)}
                    placeholder="Category name"
                    className="flex-1 bg-transparent text-slate-300 placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
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
              placeholder="Comma separated tags (e.g., tech,design,development)"
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
          <div className="overflow-x-auto">
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
                    Date
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
                      <Link
                        href={`/threehighplus/postNews/${post.id}`}
                        className="hover:text-blue-400"
                      >
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-400 hover:text-blue-300 p-1"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id!)}
                          className="text-red-400 hover:text-red-300 p-1"
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
    </motion.div>
  );
}
