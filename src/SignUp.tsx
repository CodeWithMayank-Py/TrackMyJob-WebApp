// src/SignUp.tsx
import { useState } from "react";
import { signUpWithEmail, signInWithGoogle } from "./authService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = await signUpWithEmail(email, password);
    if (user) {
      navigate("/"); // Redirect to home page after successful signup
    } else {
      setError("Failed to create an account. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate("/");
    } else {
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="mb-4 p-2 border rounded"
      />
      <button onClick={handleSignUp} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
        Sign Up
      </button>
      <button onClick={handleGoogleSignUp} className="bg-red-500 text-white px-4 py-2 rounded">
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
