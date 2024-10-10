import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import JobApplication from './job-application-tracker';
import StarryBackground from './landingPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/job-application-tracker" element={<PrivateRoute><JobApplication /></PrivateRoute>} />
      <Route path="/" element={<StarryBackground />} />
    </Routes>
  );
}

export default App;
