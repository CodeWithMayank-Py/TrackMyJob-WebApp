import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
