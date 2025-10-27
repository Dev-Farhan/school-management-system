import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddPage from '../views/admissionForm/add';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AdmissionForm = Loadable(lazy(() => import('views/admissionForm')));
const SessionPage = Loadable(lazy(() => import('views/session')));
const SessionAddPage = Loadable(lazy(() => import('views/session/add')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
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
