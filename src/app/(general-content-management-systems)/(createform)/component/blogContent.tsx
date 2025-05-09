import { getAllblogNews } from "@/context/general-context/getBlognews";
export default async function BlogContent() {
  const blogNews = await getAllblogNews();

  return (
    <div className="p-10">
      {blogNews.map((blog, index) => (
        <div key={`${blog.id}-${index}`}>
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          {blog.content &&
            blog.content.map((paragraph, paragraphIndex) => (
              <p className="w-full mt-2 border p-2" key={`${blog.id}-${index}-${paragraphIndex}`}>
                {paragraph}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
}

