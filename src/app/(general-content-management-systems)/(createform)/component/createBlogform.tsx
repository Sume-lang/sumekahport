"use client";
import { useState } from "react";
import createBlogNews from "@/context/general-context/createBlognews";
import { BlogGeneralType } from "@/type/general-type/generalType";
import { motion } from "framer-motion";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function CreateBlogNews() {
  const [blog, setBlog] = useState<BlogGeneralType>({
    id: "",
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
    createAt: "",
    updateAt: "",
    publihsed: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBlogNews(blog);
      alert("Blog post created successfully!");
      setBlog({
        id: "",
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
        createAt: "",
        updateAt: "",
        publihsed: false,
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Failed to create blog post. Please try again later.");
    }
  };

  const handleChange = (field: keyof BlogGeneralType, value: string) => {
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
        <h1 className="text-3xl font-bold">
          Create Your <span className="text-slate-50">Blog Post</span> Here!!
        </h1>
      </section>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
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
                    className="block w-full bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
                  />
                </td>
                <td className="p-2 w-1/12">
                  <button
                    type="button"
                    onClick={() => handleDeleteContent(index)}
                    className="flex items-center hover:bg-[#faad86]/80 transition duration-300 ease-in-out w-full p-2 rounded-md"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="">
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
          className="mt-4 w-1/4 p-2 bg-[#faad86] text-white  hover:bg-[#faad86]/80 transition duration-300 ease-in-out  rounded-md"
        >
          Submit
        </button>
      </motion.form>
    </motion.main>
  );
}

// export default function CreateBlogNews() {
//   const [blogData, setBlogData] = useState<BlogGeneralType>({
//     id: "",
//     title: "",
//     slug: "",
//     content: [],
//     date: "",
//     modified: "",
//     status: "publish",
//     author: [],
//     categories: [],
//     tags: [],
//     excerpt: "",
//     featuredImage: [],
//     createAt: "",
//     updateAt: "",
//     publihsed: false,
//   });

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       await createBlogNews(blogData);
//       alert("Blog post created successfully!");
//       setBlogData({
//         id: "",
//         title: "",
//         slug: "",
//         content: [],
//         date: "",
//         modified: "",
//         status: "publish",
//         author: [],
//         categories: [],
//         tags: [],
//         excerpt: "",
//         featuredImage: [],
//         createAt: "",
//         updateAt: "",
//         publihsed: false,
//       });
//     } catch (error) {
//       console.error("Error creating blog post:", error);
//       alert("Failed to create blog post. Please try again later.");
//     }
//   };

//   const handleChange =
//     (field: keyof BlogGeneralType) =>
//     (value: string | string[] | Date, index?: number) => {
//       const formattedValue =
//         value instanceof Date ? format(value, "yyyy-MM-dd") : value;

//       if (index !== undefined && field === "content") {
//         setBlogData((prevData) => {
//           const content = [...(prevData.content ?? [])];
//           content[index] = formattedValue as string;
//           return { ...prevData, content };
//         });
//       } else {
//         setBlogData((prevData) => ({
//           ...prevData,
//           [field]: formattedValue,
//         }));
//       }
//     };

//   const handleAddMoreContent = () => {
//     setBlogData((prev) => ({
//       ...prev,
//       content: [...(prev.content ?? []), ""],
//     }));
//   };

//   const handleDeleteContent = (index: number) => {
//     setBlogData((prev) => ({
//       ...prev,
//       content: prev.content?.filter((_, i) => i !== index) ?? [],
//     }));
//   };

//   const parseDate = (dateString: string) => {
//     return dateString ? new Date(dateString) : undefined;
//   };

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col gap-4 p-10 w-full h-auto"
//     >
//       <motion.form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 w-full border p-10"
//       >
//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={blogData.title}
//             placeholder="Title"
//             onChange={(e) => handleChange("title")(e.target.value)}
//             className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//             required
//           />
//           <input
//             type="text"
//             value={blogData.slug}
//             placeholder="Slug"
//             onChange={(e) => handleChange("slug")(e.target.value)}
//             className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//             required
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="relative flex-1">
//             <CalendarPicker
//               key="date"
//               onChange={(date) => date && handleChange("date")(date)}
//               initialDate={parseDate(blogData.date)}
//             />
//           </div>
//           <div className="relative flex-1">
//             <CalendarPicker
//               key="modified"
//               onChange={(date) => date && handleChange("modified")(date)}
//               initialDate={parseDate(blogData.modified)}
//             />
//           </div>
//         </div>

//         <textarea
//           value={blogData.excerpt}
//           placeholder="Excerpt"
//           onChange={(e) => handleChange("excerpt")(e.target.value)}
//           className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//           required
//         />

//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={blogData.categories.join(", ")}
//             placeholder="Categories (comma separated)"
//             onChange={(e) =>
//               handleChange("categories")(
//                 e.target.value.split(", ").filter(Boolean)
//               )
//             }
//             className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//           />
//           <input
//             type="text"
//             value={blogData.tags.join(", ")}
//             placeholder="Tags (comma separated)"
//             onChange={(e) =>
//               handleChange("tags")(e.target.value.split(", ").filter(Boolean))
//             }
//             className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//           />
//         </div>

//         <label id="status-label">Status</label>
//         <select
//           aria-labelledby="status-label"
//           value={blogData.status}
//           onChange={(e) => handleChange("status")(e.target.value)}
//           className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//         >
//           <option value="publish">Publish</option>
//           <option value="draft">Draft</option>
//           <option value="pending">Pending</option>
//         </select>

//         <div className="flex gap-4">
//           <div className="relative flex-1">
//             <CalendarPicker
//               key="createAt"
//               onChange={(date) => date && handleChange("createAt")(date)}
//               initialDate={parseDate(blogData.createAt)}
//             />
//           </div>
//           <div className="relative flex-1">
//             <CalendarPicker
//               key="updateAt"
//               onChange={(date) => date && handleChange("updateAt")(date)}
//               initialDate={parseDate(blogData.updateAt)}
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           {blogData.content?.map((content, index) => (
//             <div key={index} className="flex gap-4">
//               <textarea
//                 value={content}
//                 placeholder={`Paragraph ${index + 1}`}
//                 onChange={(e) => handleChange("content")(e.target.value, index)}
//                 className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => handleDeleteContent(index)}
//                 className="bg-red-500/40 text-white p-2 rounded-md hover:bg-red-600/30 transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddMoreContent}
//             className="bg-[#faad86]/10 text-white p-2 rounded-md"
//           >
//             Add Content Block
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="bg-[#faad86] text-black p-2 rounded-md hover:bg-[#faad86]/80 transition-colors mt-4"
//         >
//           Create Blog Post
//         </button>
//       </motion.form>
//     </motion.main>
//   );
// }
