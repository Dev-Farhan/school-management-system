import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';
import ErrorBoundary from './ErrorBoundary';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
  {
    ...MainRoutes,
    errorElement: <ErrorBoundary />
  },
  {
    ...AuthenticationRoutes,
    errorElement: <ErrorBoundary />
  }
]);

export default router;
