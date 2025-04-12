import { getExperience } from "@/context/experiences";
import { FaBold, FaCommentDots, FaStripe } from "react-icons/fa";

export default async function BlogPage() {
  try {
    const posts = await getExperience();

    return (
      <main className="flex flex-row gap-2 mx-auto p-4 w-full">
        <section className="flex flex-row gap-2 w-full">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-[1px] border-[#faad86]/20 shadow-md rounded-lg p-4 mb-4 flex flex-col gap-2 w-1/2"
            >
              <h1 className="text-2xl font-bold">{post.name}</h1>
              {post.periode && (
                <p className="text-sm font-light w-full gap-2">
                  {post.periode?.map((periode, index) => (
                    <span key={index} className="px-1 py-1">
                      {periode}
                      {index < 1 ? "-" : index === 1 && post.periode ? "" : ""}
                    </span>
                  ))}
                </p>
              )}

              <p className="text-sm font-light">{post.position}</p>
              <h1 className="text-lg font-bold">Responsible</h1>
              <p>{post.officelocation}</p>
              {post.responsible && (
                <ul className="list-disc pl-4">
                  {post.responsible.map((responsible, index) => (
                    <li key={index}>{responsible}</li>
                  ))}
                </ul>
              )}
              <h1 className="text-lg font-bold">Achievement</h1>
              {post.achievement && (
                <ul className="list-disc pl-4">
                  {post.achievement.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </main>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
        <div className="px-4 py-3 rounded">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
}
