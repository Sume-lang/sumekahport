import { db } from "@/lib/firebase";
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
} from "firebase/firestore";

const blogExperience = collection(db, "blogPost");

// Create
export const createBlogpost = async (
  postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };

  try {
    const docRef = await addDoc(blogExperience, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error("Error creating blogPost:", error);
    throw error;
  }
};

// Read All
export const getBlogPost = async (): Promise<BlogPost[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogPost"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content ?? [],
        date: data.date,
        modified: data.modified,
        status: data.status,
        author: data.author,
        categories: data.categories ?? [],
        tags: data.tags ?? [],
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        featuredImageAlt: data.featuredImageAlt,
        createAt: data.createAt,
        updateAt: data.updateAt,
      } as BlogPost;
    });
  } catch (error) {
    console.error("Error fetching blogPost:", error);
    throw new Error("Failed to fetch blogPost");
  }
};

// Read Single
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, "blogPost", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error("Error getting blogPost by ID:", error);
    throw error;
  }
};

// Update
export const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
  try {
    const docRef = doc(db, "blogPost", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blogPost:", error);
    throw error;
  }
};

// Delete
export const deleteBlogPost = async (id: string) => {
  try {
    const docRef = doc(db, "blogPost", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting blogPost:", error);
    throw error;
  }
};

