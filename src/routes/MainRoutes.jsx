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
      path: 'dashboard',
      children: [
        // {
        //   path: 'default',
        //   element: <RoleBasedDashboard />
        // },
        {
          path: 'super',
          element: (
            <RoleRoute allowedRoles={['super_admin']}>
              <SuperAdminDashboard />
            </RoleRoute>
          )
        },
        {
          path: 'school',
          element: (
            <RoleRoute allowedRoles={['school_admin', 'super_admin']}>
              <SchoolAdminDashboard />
            </RoleRoute>
          )
        }
      ]
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
          path: 'sessions',
          element: <SessionsPage />
        },
        {
          path: 'classes',
          element: <ClassesPage />
        },
        {
          path: 'sections',
          element: <SectionsPage />
        },
      ]
    }
  ]
};

export default MainRoutes;
