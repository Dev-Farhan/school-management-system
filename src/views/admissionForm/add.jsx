import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainCard from 'ui-component/cards/MainCard';
import dayjs from 'dayjs';
import { supabase } from '../../utils/supabaseClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Student name is required'),
  father_name: yup.string().required('Father name is required'),
  mother_name: yup.string().required('Mother name is required'),
  dob: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  admission_fee: yup
    .number()
    .typeError('Admission fee must be a number')
    .positive('Fee must be positive')
    .required('Admission fee is required'),
  admission_date: yup.date().required('Admission date is required'),
  status: yup.string().required('Status is required'),
  session_id: yup.string().required('Session ID is required')
});

export default function AddPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  // ✅ Fetch sessions from Supabase
  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('id, name, start_date, end_date')
        .order('start_date', { ascending: false });

      if (error) console.error('❌ Error fetching sessions:', error);
      else setSessions(data || []);
      setLoadingSessions(false);
    };

    fetchSessions();
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      father_name: '',
      mother_name: '',
      dob: null,
      gender: '',
      address: '',
      phone: '',
      admission_fee: '',
      admission_date: null,
      status: '',
      session_id: ''
    }
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dob: dayjs(data.dob).format('YYYY-MM-DD'),
      admission_date: dayjs(data.admission_date).format('YYYY-MM-DD')
    };
    toast.loading('Adding new addmission application...');
    const { error } = await supabase.from('admission_applications').insert(formattedData);
    toast.dismiss();

    console.log('✅ Admission Form Data:', formattedData);
    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      toast.error('Failed to add admission application. Try again!');
    } else {
      toast.success('Admission application added successfully 🎉');
      navigate('/admission-form');
      reset();
    }
  };

  return (
    <MainCard title="Fill Admission Details">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Student Name" fullWidth error={!!errors.name} helperText={errors.name?.message} />
                )}
              />
            </Grid>

            {/* Father Name */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="father_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Father's Name"
                    fullWidth
                    error={!!errors.father_name}
                    helperText={errors.father_name?.message}
                  />
                )}
              />
            </Grid>

            {/* Mother Name */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="mother_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mother's Name"
                    fullWidth
                    error={!!errors.mother_name}
                    helperText={errors.mother_name?.message}
                  />
                )}
              />
            </Grid>

            {/* DOB - MUI DatePicker */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dob,
                        helperText: errors.dob?.message
                      }
                    }}
                  />
                )}
              />
            </Grid>

            {/* Gender */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Gender" error={!!errors.gender} helperText={errors.gender?.message}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* Phone */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone Number" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
                )}
              />
            </Grid>

            {/* Address */}
            <Grid item size={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            {/* Admission Fee */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="admission_fee"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Admission Fee"
                    type="number"
                    fullWidth
                    error={!!errors.admission_fee}
                    helperText={errors.admission_fee?.message}
                  />
                )}
              />
            </Grid>

            {/* Admission Date - MUI DatePicker */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="admission_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Admission Date"
                    format="DD/MM/YYYY"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.admission_date,
                        helperText: errors.admission_date?.message
                      }
                    }}
                  />
                )}
              />
            </Grid>

            {/* Status */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth label="Status" error={!!errors.status} helperText={errors.status?.message}>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* Session ID Select */}
            <Grid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="session_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Select Session"
                    fullWidth
                    error={!!errors.session_id}
                    helperText={errors.session_id?.message}
                  >
                    {loadingSessions ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} /> &nbsp; Loading...
                      </MenuItem>
                    ) : sessions.length > 0 ? (
                      sessions.map((session) => (
                        <MenuItem key={session.id} value={session.id}>
                          {session.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No sessions found</MenuItem>
                    )}
                  </TextField>
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item size={12} mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Button variant="outlined" color="secondary" type="submit">
                Cancel
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </MainCard>
  );
}
