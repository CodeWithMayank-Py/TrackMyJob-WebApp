// src/App.tsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import JobApplicationTracker from "./job-application-tracker";
import SettingsPage from "./settings-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<JobApplicationTracker />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Add your other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
