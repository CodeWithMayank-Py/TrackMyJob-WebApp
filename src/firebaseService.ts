// src/firebaseService.ts
import { db, auth } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { JobApplication } from "./job-application-tracker"; // Import your JobApplication type if needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const applicationsCollection = collection(db, "applications");

// Fetch all job applications
export const getApplications = async () => {
  const snapshot = await getDocs(applicationsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new job application
export const addApplication = async (application: Omit<JobApplication, "id">) => {
  await addDoc(applicationsCollection, application);
};

// Update an existing job application
export const updateApplication = async (id: string, updatedData: Partial<JobApplication>) => {
  const applicationDoc = doc(db, "applications", id);
  await updateDoc(applicationDoc, updatedData);
};

// Delete a job application
export const deleteApplication = async (id: string) => {
  const applicationDoc = doc(db, "applications", id);
  await deleteDoc(applicationDoc);
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};