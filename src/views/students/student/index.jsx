import { Box, Button, Typography, Avatar, Chip, Stack, MenuItem, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import TableHeader from '../../../components/TableHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const students = [
  {
    id: 1,
    name: 'Rahul Kumar',
    rollNo: '2024001',
    class: '10',
    section: 'A',
    parentName: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    status: 'active'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rollNo: '2024002',
    class: '10',
    section: 'A',
    parentName: 'Vijay Sharma',
    phone: '+91 98765 43211',
    status: 'active'
  },
  {
    id: 3,
    name: 'Amit Singh',
    rollNo: '2024003',
    class: '9',
    section: 'B',
    parentName: 'Suresh Singh',
    phone: '+91 98765 43212',
    status: 'active'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    rollNo: '2024004',
    class: '8',
    section: 'A',
    parentName: 'Rakesh Gupta',
    phone: '+91 98765 43213',
    status: 'active'
  },
  {
    id: 5,
    name: 'Vikram Patel',
    rollNo: '2024005',
    class: '10',
    section: 'B',
    parentName: 'Dinesh Patel',
    phone: '+91 98765 43214',
    status: 'inactive'
  }
];

const columns = [
  {
    field: 'name',
    headerName: 'Student',
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'secondary.main', color: 'white', fontSize: '14px' }}>
          {params.value
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography fontWeight={600}>{params.value}</Typography>
          <Typography variant="caption" color="text.secondary">
            Roll No: {params.row.rollNo}
          </Typography>
        </Box>
      </Stack>
    )
  },
  {
    field: 'class',
    headerName: 'Class',
    flex: 1,
    renderCell: (params) => {
      const row = params.row;
      if (!row) return null;

      return (
        <Typography>
          Class {row.class}-{row.section}
        </Typography>
      );
    }
  },
  {
    field: 'parentName',
    headerName: 'Parent / Guardian',
    flex: 1.5,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Typography>{params.value}</Typography>
        <Typography variant="caption" color="text.secondary">
          {params.row.phone}
        </Typography>
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => <Chip label={params.value} color={params.value === 'active' ? 'success' : 'default'} size="small" />
  }
];

const Students = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [classValue, setClassValue] = useState('');
  const [sectionValue, setSectionValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  return (
    <MainCard>
      <TableHeader
        search={search}
        setSearch={setSearch}
        classValue={classValue}
        setClassValue={setClassValue}
        sectionValue={sectionValue}
        setSectionValue={setSectionValue}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
        onAdd={() => navigate('/students/add-student')}
        onExport={() => console.log('Export Clicked')}
      />
      <Box sx={{ height: 520, bgcolor: 'background.paper', borderRadius: 2 }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          checkboxSelection
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          sx={{
            '& .MuiDataGrid-cell': {
              alignItems: 'center',
              py: 1.5 // vertical padding
            }
          }}
        />
      </Box>
    </MainCard>
  );
};

export default Students;
