import { db } from "@/lib/firebase";
import {Cms} from "@/type/cms";
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

const blogCMS = collection(db, "cms");

// Create
export const createCms = async (
  cmsData: Omit<Cms, "id" | "createdAt" | "updatedAt">
) => {
  const newCms = {
    ...cmsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };

  try {
    const docRef = await addDoc(blogCMS, newCms);
    return { id: docRef.id, ...newCms };
  } catch (error) {
    console.error("Error creating cms:", error);
    throw error;
  }
};

// Read All
export const getCms = async (): Promise<Cms[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "cms"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Cms;
    });
  } catch (error) {
    console.error("Error fetching cms:", error);
    throw new Error("Failed to fetch cms");
  }
};

// Read Single
export const getcmsById = async (id: string): Promise<Cms | null> => {
  try {
    const docRef = doc(db, "cms", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as Cms;
    }
    return null;
  } catch (error) {
    console.error("Error getting cms by ID:", error);
    throw error;
  }
};

// Update
export const updateCms = async (id: string, cmsData: Partial<Cms>) => {
  try {
    const docRef = doc(db, "cms", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await updateDoc(docRef, {
      ...cmsData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating cms:", error);
    throw error;
  }
};

// Delete
export const deleteCms = async (id: string) => {
  try {
    const docRef = doc(db, "cms", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting cms:", error);
    throw error;
  }
};

