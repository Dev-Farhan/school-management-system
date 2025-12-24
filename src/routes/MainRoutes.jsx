import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from 'components/PrivateRoute';
import RoleRoute from 'components/RoleRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const RoleBasedDashboard = Loadable(lazy(() => import('views/dashboard/RoleBasedDashboard')));
const SuperAdminDashboard = Loadable(lazy(() => import('views/dashboard/SuperAdmin')));
const SchoolAdminDashboard = Loadable(lazy(() => import('views/dashboard/SchoolAdmin')));
const Plans = Loadable(lazy(() => import('views/super-admin/plans')));
const Schools = Loadable(lazy(() => import('views/super-admin/schools')));
const SessionsPage = Loadable(lazy(() => import('views/school/academic-core/sessions')));
const ClassesPage = Loadable(lazy(() => import('views/school/academic-core/classes')));
const SectionsPage = Loadable(lazy(() => import('views/school/academic-core/section')));
const AcademicSetup = Loadable(lazy(() => import('views/school/academic-core/academic-setup')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: '/',
      element: <RoleBasedDashboard />
    },
    {
      path: 'plans',
      element: (
        <RoleRoute allowedRoles={['super_admin']}>
          <Plans />
        </RoleRoute>
      )
    },
    {
      path: 'schools',
      element: (
        <RoleRoute allowedRoles={['super_admin']}>
          <Schools />
        </RoleRoute>
      )
    },
    {
      path: 'academic-core',
      children: [
        {
          path: 'academic-setup',
          element: <AcademicSetup />
        },
        {
          path: 'sessions',
          element: <SessionsPage />
        },


      ]
    }
  ]
};

export default MainRoutes;
