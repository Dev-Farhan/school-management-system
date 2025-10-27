// material-ui
import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

// ==============================|| SESSION PAGE ||============================== //

export default function SessionPage() {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddNew = () => {
    navigate('/session/add');
  };

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('sessions').select('*');
      console.log('Dataaaaaaaaaaaaa', data);
      if (error) throw error;
      setSessionData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error fetching sessions');
      setIsLoading(false);
    }
  };
  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3">Session List</Typography>
        <Button variant="contained" color="secondary" startIcon={<IconPlus />} onClick={handleAddNew}>
          Add
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <DataGrid
            rows={sessionData || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            showToolbar
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}

// Dummy columns configuration
const columns = [
  { field: 'name', headerName: 'Session Name', width: 200 },
  { field: 'start_date', headerName: 'Start Date', width: 200 },
  { field: 'end_date', headerName: 'End Date', width: 200 }
  // { field: 'status', headerName: 'Status', width: 130 }
];

// Dummy data
const rows = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    course: 'Computer Science',
    status: 'Pending'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phoneNumber: '098-765-4321',
    course: 'Engineering',
    status: 'Approved'
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    phoneNumber: '555-555-5555',
    course: 'Mathematics',
    status: 'Rejected'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah@example.com',
    phoneNumber: '444-444-4444',
    course: 'Physics',
    status: 'Pending'
  },
  {
    id: 5,
    firstName: 'Tom',
    lastName: 'Brown',
    email: 'tom@example.com',
    phoneNumber: '333-333-3333',
    course: 'Chemistry',
    status: 'Approved'
  }
];
