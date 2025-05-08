import { db } from "@/lib/firebase";
import {BlogGeneralType} from '@/type/general-type/generalType'
import {
    collection,
    getDocs,
    getDoc,
    doc
} from "firebase/firestore";

// const BlogNewsData = collection(db, "generalcontext", 'blognews');

const getAllblogNews = async (): Promise<BlogGeneralType[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "generalcontext","blognewsID", "blognewscontents"));
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        } as BlogGeneralType;
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw new Error("Failed to fetch blog posts");
    }
};

const getBlogPostById = async (id: string): Promise<BlogGeneralType> => {
    try {
      const docRef = doc(db,"generalcontext","blognewsID", "blognewscontents", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
        } as BlogGeneralType;
      }
      return {} as BlogGeneralType;
    } catch (error) {
      console.error("Error getting blogPost by ID:", error);
      throw error;
    }
}
  
export  {getAllblogNews, getBlogPostById}