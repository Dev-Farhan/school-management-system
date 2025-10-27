import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from 'contexts/AuthContext';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { School } from '@mui/icons-material';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| AUTH3 - LOGIN ||================================ //

export default function Login() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Redirect to the page they tried to visit or to dashboard
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    }
  }, [user, navigate, location]);

  return (
    <AuthWrapper1>
      <Grid container direction="column" sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Grid size={12}>
          <Grid container sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <School sx={{ fontSize: 20, color: 'secondary.main' }} />
                      <Box>
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 'bold',
                            color: 'secondary.main',
                            letterSpacing: '0.5px',
                            fontSize: { xs: '1rem', sm: '1rem' }
                          }}
                        >
                          EduTrack
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'text.secondary',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontSize: { xs: '0.5rem', sm: '0.5rem' }
                          }}
                        >
                          School Management System
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Grid>
                        <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main' }}>
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid size={12}>
                    <Divider />
                  </Grid>
                  <Grid size={12}>
                    <Grid container direction="column" sx={{ alignItems: 'center' }} size={12}>
                      <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ px: 3, my: 3 }} size={12}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
