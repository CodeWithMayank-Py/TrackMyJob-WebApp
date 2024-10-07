// src/authService.ts
import { auth, googleProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";

// Sign up with Email and Password
export const signUpWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Sign in with Email and Password
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

// Sign out user
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
