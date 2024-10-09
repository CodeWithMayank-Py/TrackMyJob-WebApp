import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivateRoute from './PrivateRoute';
import DemoPage from './DemoPage';
import './index.css';
import StarryBackground from './landingPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/demo"
        element={
          <PrivateRoute>
            <DemoPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<StarryBackground />} />
    </Routes>
  );
}

export default App;
