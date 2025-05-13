import { app } from "@/lib/firebase";
import { Itinerary } from "@/type/threehighplus/itinerary";
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
const blogItinerary = collection(
  db,
  "threehighplus",
  "itinerary",
  "itinerarys"
);

const createItinerary = async (
  postData: Omit<Itinerary, "id" | "createdAt" | "updatedAt">
) => {
  const newPost = {
    ...postData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    published: false,
  };
  try {
    const docRef = await addDoc(blogItinerary, newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.log("Error creating Blogpost:", error);
  }
};
const updateItinerary = async (id: string, postData: Partial<Itinerary>) => {
  try {
    const docRef = doc(db, "threehighplus", "itinerary", "itinerarys", id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blogPost:", error);
    throw error;
  }
};

const deleteItinerary = async (id: string) => {
  try {
    const docRef = doc(db, "threehighplus", "itinerary", "itinerarys", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting Itinerary:", error);
    throw error;
  }
};

const getAllItinerary = async (): Promise<Itinerary[]> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "threehighplus", "itinerary", "itinerarys")
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the Firestore document ID
      ...(doc.data() as Itinerary),
    }));
  } catch (error) {
    console.log("Error getting all packages:", error);
    throw error;
  }
};

const getAllItineraryById = async (id: string): Promise<Itinerary | null> => {
  try {
    const docRef = doc(db, "threehighplus", "itinerary", "itinerarys", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as Itinerary;
    }
    return null;
  } catch (error) {
    console.error("Error getting Itinerary by ID:", error);
    throw error;
  }
};

export {
  createItinerary,
  getAllItinerary,
  getAllItineraryById,
  updateItinerary,
  deleteItinerary,
};
