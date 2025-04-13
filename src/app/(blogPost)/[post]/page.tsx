import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function PostPage({
  params,
}: {
  params: { post: string };
}) {
  // Step 1: Get the post data from the database
  const { post } = params;
  const docRef = doc(db, "blogPost", post);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>Post not found</div>;
  }

  const postData = docSnap.data();

  // Step 2: Get the comments for the post

  // Step 3: Render the post and comments
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{postData.title}</h1>
      <div className="mt-4">
        <p>{postData.content}</p>
      </div>
    </div>
  );
}

