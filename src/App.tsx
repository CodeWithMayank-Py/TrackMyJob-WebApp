// src/App.tsx
import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import JobApplicationTracker from "./job-application-tracker";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading state while authentication status is being determined
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* If the user is not authenticated, redirect to SignIn */}
      <Route path="/" element={user ? <JobApplicationTracker /> : <Navigate to="/signin" />} />

      {/* Sign In route for existing users */}
      <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />

      {/* Sign Up route for new users */}
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />

      {/* Fallback route for any other paths */}
      <Route path="*" element={<Navigate to={user ? "/" : "/signin"} />} />
    </Routes>
  );
}

export default App;
