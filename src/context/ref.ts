import { db } from "@/lib/firebase";
import { Ref } from "@/type/ref";
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

const dataReferences = collection(db, "referencesperson");

// Create References
export const createReferences = async (
  postData: Omit<Ref, "id" | "createdAt" | "updatedAt">
) => {
  const newReferences = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };

  try {
    const docRef = await addDoc(dataReferences, newReferences);
    return { id: docRef.id, ...newReferences };
  } catch (error) {
    console.error("Error creating References:", error);
    throw error;
  }
};

export const getReferencesperson = async (): Promise<Ref[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "referencesperson"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        organization: data.organization,
        position: data.position,
        related: data.related,
        desc: data.desc,
        email: data.email,
      } as Ref;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};

// Read Single
export const getReferencespersonById = async (id: string): Promise<Ref | null> => {
  try {
    const docRef = doc(db, "referencesperson", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Ref;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting References by ID:", error);
    throw error;
  }
};

// Update
// Update
// Update
export const updateReferences = async (id: string, postData: Partial<Ref>): Promise<Ref> => {
  try {
    const docRef = doc(db, "referencesperson", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
    return { ...postData, updatedAt: serverTimestamp() } as Ref;
  } catch (error) {
    console.error("Error updating References:", error);
    throw error;
  }
};

// Delete
export const deleteReferences = async (id: string) => {
  try {
    const docRef = doc(db, "referencesperson", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting References:", error);
    throw error;
  }
};

