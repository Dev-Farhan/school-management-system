// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { useSession } from '../../../contexts/SessionContext'
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { selectedSession, setSelectedSession } = useSession();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch all available years for the dropdown
    const fetchAll = async () => {
      const { data } = await supabase.from('sessions').select('*');
      setSessions(data || []);
    };
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const newSession = sessions.find(s => s.id === e.target.value);
    setSelectedSession(newSession); // Updates the WHOLE app
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            bgcolor: 'secondary.light',
            color: 'secondary.dark',
            '&:hover': {
              bgcolor: 'secondary.dark',
              color: 'secondary.light'
            }
          }}
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Session Year</InputLabel>
          <Select
            value={selectedSession?.name || ''}
            label="Session Year"
            onChange={handleChange}
          >
            {sessions.map((s) => (
              <MenuItem key={s.name} value={s.name}>
                {s.name} {s.is_active ? "(Active)" : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* notification */}
      <NotificationSection />

      {/* profile */}
      <ProfileSection />
    </>
  );
}
