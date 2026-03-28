import React from 'react';
import { TextField, Button, Grid, Box, FormControlLabel, Switch } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainCard from 'ui-component/cards/MainCard';
import dayjs from 'dayjs';
import { supabase } from '../../utils/supabaseClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
// ✅ Validation Schema
const schema = yup.object().shape({
  session_name: yup.string().required('Session name is required').min(3, 'Session name must be at least 3 characters'),
  session_start_date: yup.date().required('Start date is required').typeError('Please select a valid start date'),
  session_end_date: yup
    .date()
    .required('End date is required')
    .typeError('Please select a valid end date')
    .test('is-after', 'End date must be after start date', function (value) {
      const { session_start_date } = this.parent;
      return (
        !value ||
        !session_start_date ||
        dayjs(value).isAfter(dayjs(session_start_date)) ||
        dayjs(value).isSame(dayjs(session_start_date), 'day')
      );
    }),
  isactive: yup.boolean().required('Status is required')
});

export default function SessionAddPage() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      session_start_date: null,
      session_end_date: null,
      isactive: true
    }
  });

  const onSubmit = async (data) => {
    const formattedData = {
      name: data.session_name,
      start_date: dayjs(data.session_start_date).format('YYYY-MM-DD'),
      end_date: dayjs(data.session_end_date).format('YYYY-MM-DD'),
      isactive: data.isactive
    };

    console.log('✅ Session Data:', formattedData);

    toast.loading('Adding new session...');

    const { error } = await supabase.from('sessions').insert([formattedData]);

    toast.dismiss();

    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      toast.error(error.message || 'Error adding session');
    } else {
      toast.success('Session added successfully 🎉');
      reset();
    }
  };

  return (
    <MainCard title="Add New Session">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Session Name */}
            <Grid item size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="session_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Session Name"
                    fullWidth
                    error={!!errors.session_name}
                    helperText={errors.session_name?.message}
                  />
                )}
              />
            </Grid>

            {/* Start Date */}
            <Grid item size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="session_start_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Session Start Date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.session_start_date,
                        helperText: errors.session_start_date?.message
                      }
                    }}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />
            </Grid>

            {/* End Date */}
            <Grid item size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="session_end_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Session End Date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.session_end_date,
                        helperText: errors.session_end_date?.message
                      }
                    }}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                )}
              />
            </Grid>

            {/* Active Toggle */}
            <Grid item size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
              <Controller
                name="isactive"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} color="secondary" />}
                    label="Active"
                  />
                )}
              />
            </Grid>
          </Grid>
          {/* Buttons */}
          <Grid xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2
              }}
            >
              <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/session')}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary">
                Add Session
              </Button>
            </Box>
          </Grid>
        </form>
      </LocalizationProvider>
    </MainCard>
  );
}
