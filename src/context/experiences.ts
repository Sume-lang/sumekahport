import { app } from "@/lib/firebase";
import { Experience } from "@/type/exp";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  getFirestore
} from "firebase/firestore";

const db=getFirestore(app)
const blogExperience = collection(db, "Experinces");

// Create
export const createExperience = async (
  postData: Omit<Experience, "id" | "createdAt" | "updatedAt">
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
    console.error("Error creating experience:", error);
    throw error;
  }
};

// Read All
export const getExperience = async (): Promise<Experience[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Experinces"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "",
        position: data.position ?? "",
        periode: data.periode ?? "",
        officelocation: data.officelocation ?? [],
        responsible: data.responsible ?? [],
        achievement: data.achievement ?? [],
      } as Experience;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};

// Read Single
export const getExperienceById = async (
  id: string
): Promise<Experience | null> => {
  try {
    const docRef = doc(db, "Experinces", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        name: docSnap.data()?.name ?? "",
        position: docSnap.data()?.position ?? "",
        periode: docSnap.data()?.periode ?? "",
        officelocation: docSnap.data()?.officelocation ?? [],
        responsible: docSnap.data()?.responsible ?? [],
        achievement: docSnap.data()?.achievement ?? [],
      } as Experience;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting experience by ID:", error);
    throw error;
  }
};

// Update
export const updateBlogPost = async (
  id: string,
  postData: Partial<Experience>
) => {
  try {
    const docRef = doc(db, "Experinces", id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating Experinces:", error);
    throw error;
  }
};

// Delete
export const deleteExperience = async (id: string) => {
  try {
    const docRef = doc(db, "Experinces", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting Experinces:", error);
    throw error;
  }
};

