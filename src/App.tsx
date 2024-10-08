import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DemoPage from './DemoPage';
import StarryBackground from './landingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/" element={<StarryBackground />} />
          <Route path="*" element={<StarryBackground />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
