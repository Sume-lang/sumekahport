import { app } from '@/lib/firebase';
import { newsBlog } from '@/type/threehighplus/postnews';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    getDoc,
    getDocs,
    getFirestore,
} from "firebase/firestore";
  
const db = getFirestore(app)
const postNews = collection(db, "threehighplus", "blogNews", 'postnews');
const createPostNews = async (newsData: Omit<newsBlog, "id" | "createdAt" | "updatedAt">) => {
    const newPost = {
        ...newsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        published: false,
    };
    try {
        const docRef = await addDoc(postNews, newPost);
        return { id: docRef.id, ...newPost };
    } catch (error) {
        console.log("Error creating Blogpost:", error);
    }
};
const getAllPostNews = async():Promise<newsBlog[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "threehighplus", "blogNews", "postnews"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as newsBlog),
        }))
    } catch (error) {
        console.log("Error getting all packages:", error);
        throw error;
    }
}
const getPostNewsById = async(id:string):Promise<newsBlog | null> => {
    try {
        const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as newsBlog;
        }
        return null;
      } catch (error) {
        console.error("Error getting blogPost by ID:", error);
        throw error;
      }
}
const updatePostNews = async (id: string, newsData: Partial<newsBlog>) => {
    try {
        const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
        await updateDoc(docRef, {
            ...newsData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating blogPost:", error);
        throw error;
    }
}
const deletePostNews = async(id:string) => {
    try {
        const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting Itinerary:", error);
        throw error;
    }
}
export {
    createPostNews,
    getAllPostNews,
    getPostNewsById,
    updatePostNews,
    deletePostNews
}