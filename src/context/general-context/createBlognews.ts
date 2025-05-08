import { db } from "@/lib/firebase";
import { BlogGeneralType } from '@/type/general-type/generalType'
import {collection,addDoc} from 'firebase/firestore'

const createBlogNews = async (data: BlogGeneralType) => {
        try {
            const docRef = await addDoc(collection(db, "generalcontext","blognewsID", "blognewscontents"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
};
    
export default createBlogNews