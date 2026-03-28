import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ShieldIcon from '@mui/icons-material/Shield';

import { gridSpacing } from 'store/constant';

export default function SuperAdminDashboard() {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Box
          sx={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 3,
              maxWidth: 500
            }}
          >
            <ShieldIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Super Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              You have full visibility across all schools, sessions and admissions. Use the
              navigation to manage system-wide settings.
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

