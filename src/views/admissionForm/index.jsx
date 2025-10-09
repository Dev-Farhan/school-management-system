// material-ui
import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { IconUserPlus } from '@tabler/icons-react';

// ==============================|| ADMISSION FORM ||============================== //

export default function AdmissionForm() {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admission-form/add');
  };

  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3">All Admission Applications</Typography>
        <Button variant="contained" color="secondary" startIcon={<IconUserPlus />} onClick={handleAddNew}>
          New Admission
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            showToolbar
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}

// Dummy columns configuration
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone', width: 130 },
  { field: 'course', headerName: 'Course', width: 130 },
  { field: 'status', headerName: 'Status', width: 100 }
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
