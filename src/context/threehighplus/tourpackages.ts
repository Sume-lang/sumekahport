import { app } from '@/lib/firebase'
import { Rinjani } from '@/type/threehighplus/tourpackages'

import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc,getDocs, getFirestore } from 'firebase/firestore'

const db = getFirestore(app)

const tourpackages = collection(db, 'threehighplus', 'packages', 'productbyiddetails')

const addTourpackages = async (postData: Omit<Rinjani, "id" | "createdAt" | "updatedAt">) => {
    const newPost = {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        published: false
    }
    try {
        const docRef = await addDoc(tourpackages, newPost);
        return { id: docRef.id, ...newPost };
    } catch (error) {
        console.log("Error creating Blogpost:", error)
    }
}


const updateTourpackages = async (
    id: string,
    postData: Partial<Rinjani>
) => {
    try {
        const docRef = doc(db,"threehighplus", "packages", "productbyiddetails", id);
        await updateDoc(docRef, {
            ...postData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating blogPost:", error);
        throw error;
    }
};

const getAllPackages = async (): Promise<Rinjani[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "threehighplus", "packages", "productbyiddetails"))
        return querySnapshot.docs.map((doc) => doc.data() as Rinjani)
    } catch (error) {
        console.log("Error getting all packages:", error);
        throw error;
    }
};

const getPackagesById = async (id: string): Promise<Rinjani | null> => {
    try {
      const docRef = doc(db, "threehighplus", "packages", "productbyiddetails", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
        } as Rinjani;
      }
      return null;
    } catch (error) {
      console.error("Error getting blogPost by ID:", error);
      throw error;
    }
  };

const deletePackages = async (id: string) => {
    try {
          const docRef = doc (db, "threehighplus", "packages", "productbyiddetails", id);
          await deleteDoc(docRef);
      } catch (error) {
          console.error("Error deleting blogPost:", error);
          throw error;
      }
  }
export {
    deletePackages,
    getPackagesById,
    getAllPackages,
    addTourpackages,
    updateTourpackages
}