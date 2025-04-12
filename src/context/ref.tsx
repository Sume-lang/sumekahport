import { db } from "@/lib/firebase";
import { Ref } from "@/type/ref";
import {
  collection,
  getDocs,
} from "firebase/firestore";

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