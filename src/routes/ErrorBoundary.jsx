import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    // Log error for debugging
    console.error('Route error:', error);
  }, [error]);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error 404 - This page doesn't exist!
          </Alert>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      );
    }

    if (error.status === 401) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error 401 - You aren't authorized to see this
          </Alert>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Box>
      );
    }

    if (error.status === 503) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error 503 - Looks like our API is down
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      );
    }

    if (error.status === 418) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error 418 - Contact administrator
          </Alert>
        </Box>
      );
    }
  }

  // Handle JavaScript errors
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error?.message || 'An unexpected error occurred'}
        </Typography>
      </Alert>
      <Button variant="contained" onClick={() => window.location.reload()} sx={{ mr: 2 }}>
        Reload Page
      </Button>
      <Button variant="outlined" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
}
