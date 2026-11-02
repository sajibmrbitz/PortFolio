import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Keep the public pages buildable before Firebase is configured. Any
  // authentication or database operation still fails until real values exist.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "local-development-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "local-development.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "local-development",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "local-development.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "local-development",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "local-development",
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const isFirebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
export default app;
