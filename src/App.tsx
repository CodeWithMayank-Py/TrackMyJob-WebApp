import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobApplicationTracker from './job-application-tracker';
import SettingsPage from './settings-page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobApplicationTracker />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}
