import { app} from "@/lib/firebase";
import { BlogPost } from "@/type/blogpost";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  getFirestore,
} from "firebase/firestore";


const db =getFirestore(app)
const blogPosting = collection(db, "blogPost");
const createBlogpost = async (
  postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publihsed: false
  };
  try {
    const docRef = await addDoc(blogPosting, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.log("Error creating Blogpost:", error)
  }
};
const getBlogPost = async (): Promise<BlogPost[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogPost"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content ?? [],
        status: data.status,
        date: data.date,
        modified: data.modified,
        author: data.author ?? [],
        categories: data.categories ?? [],
        tags: data.tags ?? [],
        excerpt: data.excerpt,
        createAt: data.createAt,
        updateAt: data.updateAt,
        // featuredImage: data.featuredImage,
        // featuredImageAlt: data.featuredImageAlt,
        // featuredImageCaption: data.featuredImageCaption,
        // commentsAllowed: data.commentsAllowed,
        // comments: data.comments
      } as BlogPost;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};
const getByIapplogpost = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef =doc(db, "blogPost", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        // Convert Firestore timestamps to Date objects
        // Ensure arrays are never undefined
        author: data.author || [],
        categories: data.categories || [],
        tags: data.tags || [],
        content: data.content || [],
        createAt: data.createAt,
        updateAt: data.updateAt,
        // featuredImage: data.featuredImage || [],
        // comments: data.comments || [],
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error("Error getting blogPost by ID:", error);
    throw error;
  }
}
const updateBlogPost = async (
  id: string,
  postData: Partial<BlogPost>
) => {
  try {
    const docRef = doc(db, "blogPost", id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blogPost:", error);
    throw error;
  }
};
const deleteBlogPost = async (id: string) => {
  try {
    const docRef = doc(db, "blogPost", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting blogPost:", error);
    throw error;
  }
};
export {createBlogpost,getBlogPost,getByIapplogpost,updateBlogPost,deleteBlogPost}