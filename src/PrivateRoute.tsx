import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or indicator here
  }

  return user ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
