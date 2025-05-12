import { app } from "@/lib/firebase";
import { Education } from "@/type/edu";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const db=getFirestore(app)
const blogEducations = collection(db, "Educations");

// Create
export const createEducation = async (
  postData: Omit<Education, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };

  try {
    const docRef = await addDoc(blogEducations, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error("Error creating Educations:", error);
    throw error;
  }
};

// Read All
export const getEducations = async (): Promise<Education[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Educations"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        institution: data.institution,
        startDate: data.startDate,
        endDate: data.endDate,
        gpa: data.gpa,
        achievements: data.achievements,
      } as Education;
    });
  } catch (error) {
    console.error("Error fetching Educations:", error);
    throw new Error("Failed to fetch Educations");
  }
};

// Read Single
export const getEducationsById = async (
  id: string
): Promise<Education | null> => {
  try {
    const docRef = doc(db, "Educations", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Education;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting Educations by ID:", error);
    throw error;
  }
};

// Update
export const updateBlogPost = async (
  id: string,
  postData: Partial<Education>
) => {
  try {
    const docRef = doc(db, "Educations", id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating Educations:", error);
    throw error;
  }
};

// Delete
export const deleteEducations = async (id: string) => {
  try {
    const docRef = doc(db, "Educations", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting Educations:", error);
    throw error;
  }
};
