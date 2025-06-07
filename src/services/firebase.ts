import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "budgetme-10610.firebaseapp.com",
  projectId: "budgetme-10610",
  storageBucket: "budgetme-10610.firebasestorage.app",
  messagingSenderId: "842387386093",
  appId: "1:842387386093:web:980318c534547c4a98a6e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();