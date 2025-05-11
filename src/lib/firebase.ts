import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigOne = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_ONEAPI_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_ONEAUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ONEPROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_ONESTORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_ONEMESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_ONEAPP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_ONEMEASUREMENT_ID
};

const app = initializeApp(firebaseConfigOne);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };