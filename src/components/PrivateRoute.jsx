import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../ui-component/Loader';
import { Box, Typography } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (error && !user) {
    // If there's an error and no user, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
