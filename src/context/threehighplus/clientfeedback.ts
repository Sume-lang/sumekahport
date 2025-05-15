import { app } from '@/lib/firebase'
import { comment } from '@/type/threehighplus/postcomment';
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc,getDocs, getFirestore } from 'firebase/firestore'
const db = getFirestore(app)
const blogComment = collection(db, "threehighplus", "clientfeedback", 'comment');

export const createComment = async(dataComment:Omit<comment, "id" | "createdAt" | "updatedAt">) => {
    const newPost = {
        ...dataComment,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        published: false,
    };
    try {
        const docRef = await addDoc(blogComment, newPost);
        return { id: docRef.id, ...newPost };
    } catch (error) {
        console.log("Error creating comment:", error);
    }
}
export const getAllComment = async():Promise<comment[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "threehighplus", "clientfeedback", "comment"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as comment),
        }))
    } catch (error) {
        console.log("Error getting all comment:", error);
        throw error;
    }
}
export const getCommentById = async(id:string):Promise<comment | null> => {
    try {
        const docRef = doc(db, "threehighplus", "clientfeedback", "comment", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as comment;
        }
        return null;
      } catch (error) {
        console.error("Error getting blogPost by ID:", error);
        throw error;
      }
}
export const updateComment = async(id:string,dataComment:Omit<comment, "id" | "createdAt" | "updatedAt">) => {
    try {
        const docRef = doc(db, "threehighplus", "clientfeedback", "comment", id);
        await updateDoc(docRef, {
            ...dataComment,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating blogPost:", error);
        throw error;
    }
}
export const deleteComment = async(id:string) => {
    try {
        const docRef = doc(db, "threehighplus", "clientfeedback", "comment", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting Itinerary:", error);
        throw error;
    }
}