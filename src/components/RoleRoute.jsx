import { Navigate } from 'react-router-dom';
import Loader from 'ui-component/Loader';
import { useAuth } from 'contexts/AuthContext';

const resolveDefaultPath = (role) => {
  if (role === 'super_admin') return '/dashboard/super';
  if (role === 'school_admin') return '/dashboard/school';
  return '/';
};

export default function RoleRoute({ children, allowedRoles }) {
  const { loading, user, profile } = useAuth();
  const role = profile?.role;

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If no allowedRoles specified, allow any authenticated user
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  if (allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to={resolveDefaultPath(role)} replace />;
}

