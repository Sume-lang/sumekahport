import { EmployeeTask } from "@/type/threehighplus/taskAssigments";

import { app } from "@/lib/firebase";
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

const db = getFirestore(app);
const TaskManagement = collection(
  db,
  "threehighplus",
  "TaskManagement",
  "TaskingData"
);
export const createTask = async (
  dataTask: Omit<EmployeeTask, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...dataTask,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };
  try {
    const docRef = await addDoc(TaskManagement, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.log("Error creating Task:", error);
  }
};
export const getAllTask = async (): Promise<EmployeeTask[]> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "threehighplus", "TaskManagement", "TaskingData")
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the Firestore document ID
      ...(doc.data() as EmployeeTask),
    }));
  } catch (error) {
    console.log("Error getting all Task:", error);
    throw error;
  }
};
export const getTaskById = async (id: string): Promise<EmployeeTask | null> => {
  try {
    const docRef = doc(
      db,
      "threehighplus",
      "TaskManagement",
      "TaskingData",
      id
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as EmployeeTask;
    }
    return null;
  } catch (error) {
    console.error("Error getting blogPost by ID:", error);
    throw error;
  }
};
export const updateTask = async (
  id: string,
  dataTask: Omit<EmployeeTask, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const docRef = doc(
      db,
      "threehighplus",
      "TaskManagement",
      "TaskingData",
      id
    );
    await updateDoc(docRef, {
      ...dataTask,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blogPost:", error);
    throw error;
  }
};
export const deleteTask = async (id: string) => {
  try {
    const docRef = doc(
      db,
      "threehighplus",
      "TaskManagement",
      "TaskingData",
      id
    );
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting Itinerary:", error);
    throw error;
  }
};
