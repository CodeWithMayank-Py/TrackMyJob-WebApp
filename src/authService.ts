import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';

// Function for signing up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// Function for signing up with Google
export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-up:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

// Function to log out the user
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User has been logged out");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};