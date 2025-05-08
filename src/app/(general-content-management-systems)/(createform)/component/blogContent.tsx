import { getAllblogNews } from "@/context/general-context/getBlognews";

export default async function BlogContent() {
  const blogNews = await getAllblogNews();

  return (
    <div>
      {blogNews.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  );
}
