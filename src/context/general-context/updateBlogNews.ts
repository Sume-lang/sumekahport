import { db } from "@/lib/firebase";
import { BlogGeneralType } from '@/type/general-type/generalType'
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore'


const updateBlogPost = async (
    id: string,
    postData: Partial<BlogGeneralType>
) => {
    try {
        const docRef = doc(db, "generalcontext","blognewsID", "blognewscontents", id);
        await updateDoc(docRef, {
            ...postData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating blogPost:", error);
        throw error;
    }
};

export default updateBlogPost