import { app } from "@/lib/firebase";
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

const db = getFirestore (app)
const deleteBlogPost = async (id: string) => {
    try {
        const docRef = doc(db, "generalcontext","blognewsID", "blognewscontents", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting blogPost:", error);
        throw error;
    }
};

export default deleteBlogPost