// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAojJcYm3AaPtdShuAh0eLsV-nfh6AsCTM",
  authDomain: "jobtracker-397c9.firebaseapp.com",
  projectId: "jobtracker-397c9",
  storageBucket: "jobtracker-397c9.appspot.com",
  messagingSenderId: "89736677004",
  appId: "1:89736677004:web:0a2a843f56ea5cc83c5da9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();