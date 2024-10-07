import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobApplicationTracker from './job-application-tracker';
import SettingsPage from './settings-page';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg font-bold hover:underline">
              Job Tracker
            </Link>
            <Link to="/settings" className="hover:underline">
              Settings
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<JobApplicationTracker />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
