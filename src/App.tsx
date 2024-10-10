import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import JobApplication from './job-application-tracker';
import StarryBackground from './landingPage';
import './index.css';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function App() {
  useEffect(() => {
    const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    
    if (GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    } else {
      console.warn('Google Analytics Measurement ID is not set');
    }
  }, []);

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
