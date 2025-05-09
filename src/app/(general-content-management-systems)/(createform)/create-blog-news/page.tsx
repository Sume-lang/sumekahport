import React from "react";
import CreateBlog from "@/app/(general-content-management-systems)/(createform)/component/createBlogform";
import BlogNews from "../component/blogContent";
export default function CreateBlogNews() {
  return (
    <main className="grid grid-cols-2 w-full min-h-screen gap-2 p-10">
      <section className="w-full border-[1px] border-[#faad86]/20 rounded-md flex items-start justify-center">
        <CreateBlog />
      </section>
      <section>
        <BlogNews />
      </section>
    </main>
  );
}
