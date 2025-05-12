import { app } from "@/lib/firebase";
import { BlogGeneralType } from '@/type/general-type/generalType'
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore'

const db =getFirestore(app)

const BlogPostNews = collection(db, "generalcontext","blognewsID","blognews")
const createPostNews = async (
  postData: Omit<BlogGeneralType, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publihsed: false
  };
  try {
    const docRef = await addDoc(BlogPostNews, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.log("Error creating Blogpost:", error)
  }
};

export default createPostNews