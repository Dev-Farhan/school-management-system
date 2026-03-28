import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import { Box, Grid, Typography } from '@mui/material';
import { School } from '@mui/icons-material';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo" sx={{ textDecoration: 'none' }}>
      {/* <Logo /> */}
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
    </Link>
  );
}
