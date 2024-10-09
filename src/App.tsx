import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';
import './index.css';
import StarryBackground from './landingPage';
import JobApplication from './job-application-tracker';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/job-application-tracker"
        element={
          <PrivateRoute>
            <JobApplication />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<StarryBackground />} />
    </Routes>
  );
}

export default App;
