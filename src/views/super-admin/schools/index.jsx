import React, { useState, useMemo, useEffect } from "react";
import {
  Box, Button, Card, CardContent, Typography, Grid, Stack,
  IconButton, TextField, Chip, Menu, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions, InputAdornment,
  Divider
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// Form & Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';

import { supabase } from '../../../utils/supabaseClient';
import MainCard from "ui-component/cards/MainCard";

// 1. Validation Schema
const schema = yup.object({
  name: yup.string().required("School name is required"),
  code: yup.string().required("School code is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  plan: yup.string().required("Please select a plan"),
  billingCycle: yup.string().oneOf(['monthly', 'yearly']).required()
}).required();

const SchoolsManagement = () => {
  const [rows, setRows] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // 2. Initialize useForm
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '', code: '', email: '', phone: '',
      address: '', plan: '', billingCycle: 'monthly'
    }
  });

  const fetchPlans = async () => {
    const { data } = await supabase
      .from('plans')
      .select('*')
      .order('price_monthly', { ascending: true });
    if (data) setPlans(data);
  };

  const fetchSchools = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('schools').select('*');
    if (data) setRows(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
    fetchSchools();
  }, []);

  // 3. Form Submit Handler
  const onSubmit = async (formData) => {
    const startDate = new Date();
    const endDate = new Date();

    if (formData.billingCycle === 'yearly') {
      endDate.setFullYear(startDate.getFullYear() + 1);
    } else {
      endDate.setMonth(startDate.getMonth() + 1);
    }

    const finalData = {
      ...formData,
      subscription_start: startDate.toISOString().split('T')[0],
      subscription_end: endDate.toISOString().split('T')[0],
      status: 'active',
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('schools').insert([finalData]);

    if (!error) {
      setOpenAdd(false);
      fetchSchools();
      reset();
    }
  };

  // Data Grid Columns Definition
  const columns = [
    {
      flex: 1,
      field: 'name',
      headerName: 'School Name',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
          <Typography variant="body2" fontWeight="medium">{params.row.name}</Typography>
          <Typography variant="caption" color="text.secondary">{params.row.email}</Typography>
        </Box>
      )
    },
    {
      flex: 1,
      field: 'code',
      headerName: 'Code',
    },
    {
      flex: 1,
      field: 'plan',
      headerName: 'Plan',
      renderCell: (params) => <Chip label={plans.find(p => p.id === params.row.plan_id)?.name} size="small" variant="outlined" />
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        const colors = { active: "success", suspended: "error", pending: "warning" };
        return (
          <Chip
            label={params.value}
            color={colors[params.value] || "default"}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        );
      }
    },
    {
      flex: 1,
      field: 'created_at',
      headerName: 'Created At',
      valueFormatter: (params) => params.created_at ? new Date(params.created_at).toLocaleDateString() : ''
    },
    {
      flex: 1,
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      renderCell: (params) => (
        <IconButton onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setSelectedSchool(params.row);
        }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      )
    }
  ];

  const filteredRows = useMemo(() => {
    return rows.filter(s =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rows, searchQuery]);

  return (
    <MainCard>
      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Schools Management</Typography>
          <Typography color="text.secondary">Manage all registered schools and subscriptions</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAdd(true)}>
          Add School
        </Button>
      </Stack>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: "Total Schools", value: rows.length, icon: <BusinessIcon />, color: "primary.main" },
          { label: "Active", value: rows.filter(s => s.status === 'active').length, icon: <CheckCircleIcon />, color: "success.main" },
          { label: "Suspended", value: rows.filter(s => s.status === 'suspended').length, icon: <BlockIcon />, color: "error.main" },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }} key={i}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${stat.color.split('.')[0]}.light`, color: stat.color, opacity: 0.8 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Schools Data Grid */}
      <Card variant="outlined" sx={{ height: 500, width: '100%' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">All Schools</Typography>
          <TextField
            size="small"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>),
            }}
          />
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ border: 'none' }}
        />
      </Card>

      {/* Add School Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add New School</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} label="School Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />}
              />
              <Stack direction="row" spacing={2}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => <TextField {...field} label="School Code" fullWidth error={!!errors.code} helperText={errors.code?.message} />}
                />
                <Controller
                  name="plan"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Plan" fullWidth error={!!errors.plan}>
                      {plans.map((p) => (
                        <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>
              <Controller
                name="billingCycle"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Billing Cycle" fullWidth>
                    <MenuItem value="monthly">Monthly (+30 Days)</MenuItem>
                    <MenuItem value="yearly">Yearly (+1 Year)</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field} label="Admin Email" type="email" fullWidth error={!!errors.email} helperText={errors.email?.message} />}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <TextField {...field} label="Phone Number" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => <TextField {...field} label="Address" multiline rows={2} fullWidth error={!!errors.address} helperText={errors.address?.message} />}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create School</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}><VisibilityIcon sx={{ mr: 1 }} fontSize="small" /> View</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><EditIcon sx={{ mr: 1 }} fontSize="small" /> Edit</MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'error.main' }} onClick={() => setAnchorEl(null)}>
          <BlockIcon sx={{ mr: 1 }} fontSize="small" /> Suspend
        </MenuItem>
      </Menu>
    </MainCard>
  );
};

export default SchoolsManagement;