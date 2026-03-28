// material-ui
import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../utils/supabaseClient';

// ==============================|| ADMISSION FORM ||============================== //

export default function AdmissionForm() {
  const navigate = useNavigate();
  const [admissionData, setAdmissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAdmissionApplications = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('admission_applications').select('*');
        console.log('Dataaaaaaaaaaaaa', data);
        if (error) throw error;
        setAdmissionData(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching admission applications');
        setIsLoading(false);
      }
    };
    getAdmissionApplications();
  }, []);

  const handleAddNew = () => {
    navigate('/admission-form/add');
  };

  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3">All Admission Applications</Typography>
        <Button variant="contained" color="secondary" startIcon={<IconPlus />} onClick={handleAddNew}>
          Add
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <DataGrid
            rows={admissionData || []}
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
  { field: 'name', headerName: 'Student Name', width: 180 },
  { field: 'father_name', headerName: "Father's Name", width: 180 },
  { field: 'mother_name', headerName: "Mother's Name", width: 180 },
  { field: 'dob', headerName: 'Date of Birth', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 }
];
