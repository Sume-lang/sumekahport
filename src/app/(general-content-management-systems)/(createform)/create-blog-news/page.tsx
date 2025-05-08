import React from "react";
import CreateBlog from "@/app/(general-content-management-systems)/(createform)/component/createBlogform";

import BlogContent from "../component/blogContent";
export default function CreateBlogNews() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen gap-2">
      <section>Create the Blog</section>
      <section>
        <CreateBlog />
      </section>
      <section>
        <BlogContent />
      </section>
    </main>
  );
}

