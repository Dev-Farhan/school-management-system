import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from 'components/PrivateRoute';
import AddPage from '../views/admissionForm/add';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AdmissionForm = Loadable(lazy(() => import('views/admissionForm')));
const SessionPage = Loadable(lazy(() => import('views/session')));
const SessionAddPage = Loadable(lazy(() => import('views/session/add')));
const StudentsPage = Loadable(lazy(() => import('views/students/student/index.jsx')));
const StudentsAddPage = Loadable(lazy(() => import('views/students/student/add.jsx')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'students',
      children: [
        {
          path: 'all-students',
          element: <StudentsPage />
        },
        {
          path: 'add-student',
          element: <StudentsAddPage />
        },
        {
          path: 'new-admission',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/admission-form',
      element: <AdmissionForm />
    },
    {
      path: '/admission-form/add',
      element: <AddPage />
    },
    { path: '/session', element: <SessionPage /> },
    { path: '/session/add', element: <SessionAddPage /> }
  ]
};

export default MainRoutes;
