import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <AuthProvider>
      <ThemeCustomization>
        <NavigationScroll>
          <>
            <RouterProvider router={router} />
          </>
        </NavigationScroll>
        <Toaster position="bottom-right" />
      </ThemeCustomization>
    </AuthProvider>
  );
}
