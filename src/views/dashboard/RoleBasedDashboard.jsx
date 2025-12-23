import { lazy, Suspense } from 'react';

import Box from '@mui/material/Box';

import Loader from 'ui-component/Loader';
import { useAuth } from 'contexts/AuthContext';

const SuperAdminDashboard = lazy(() => import('./SuperAdmin'));
const SchoolAdminDashboard = lazy(() => import('./SchoolAdmin'));
const DashboardDefault = lazy(() => import('./Default'));

export default function RoleBasedDashboard() {
  const { loading, user, profile } = useAuth();

  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Loader />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Loader />
        </Box>
      }
    >
      {profile?.role === 'super_admin' && <SuperAdminDashboard />}
      {profile?.role === 'school_admin' && <SchoolAdminDashboard />}
      {!profile?.role && <DashboardDefault />}
    </Suspense>
  );
}

