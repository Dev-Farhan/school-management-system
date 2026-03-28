import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  MenuItem,
  Divider,
  Paper
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import * as yup from 'yup';

const personalSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),

  fatherName: yup.string().required('Father name is required'),
  fatherphoneNo: yup.string().required('Father phone is required').min(10, 'Must be 10 digits'),

  motherName: yup.string().required('Mother name is required'),
  motherphoneNo: yup.string().required('Mother phone is required').min(10, 'Must be 10 digits')
});

const academicSchema = yup.object({
  admissionClass: yup.string().required('Admission class is required'),
  section: yup.string().required('Section is required'),
  admissionDate: yup.string().required('Admission date is required'),
  academicYear: yup.string().required('Academic year is required')
});

const feeSchema = yup.object({
  feeStructure: yup.string().required('Fee structure is required')
});

const steps = ['Personal Info', 'Academic Details', 'Fee Details'];
const schemas = [personalSchema, academicSchema, feeSchema];

const StudentAdmission = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    trigger,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemas[activeStep]),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      address: '',

      fatherName: '',
      fatherphoneNo: '',
      motherName: '',
      motherphoneNo: '',

      admissionClass: '',
      section: '',
      rollNo: '',
      admissionDate: '',
      academicYear: '',
      medium: '',

      prevSchool: '',
      prevClass: '',
      tcNumber: '',
      passingYear: '',

      feeStructure: '',
      paymentMode: '',
      admissionFee: '',
      registrationFee: ''
    }
  });

  const handleNext = async () => {
    const valid = await trigger();
    if (!valid) return;
    console.log('Form Data:', watch());
    if (activeStep === steps.length - 1) {
      alert('Admission Successful 🎉');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const feeStructure = watch('feeStructure');
  const admissionFee = Number(watch('admissionFee') || 0);
  const registrationFee = Number(watch('registrationFee') || 0);

  const tuitionFeeMap = {
    regular: 45000,
    rte: 0,
    scholarship: 22500,
    staff: 33750
  };

  const tuitionFee = tuitionFeeMap[feeStructure] || 0;
  const totalFee = admissionFee + registrationFee + tuitionFee;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={1}>
        New Student Admission
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <CardContent>
              {/* STEP 1 */}
              {activeStep === 0 && (
                <>
                  <Typography variant="h6" mb={2}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name *"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name *"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Date of Birth *"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                              field.onChange(date ? date.format('YYYY-MM-DD') : null);
                            }}
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

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Gender *"
                            fullWidth
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 4 }} fullWidth />

                  <Typography variant="h6" mb={2}>
                    Parent / Guardian Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="fatherName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Father's Name *"
                            fullWidth
                            error={!!errors.fatherName}
                            helperText={errors.fatherName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="fatherphoneNo"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Father's Phone Number *"
                            fullWidth
                            error={!!errors.fatherphoneNo}
                            helperText={errors.fatherphoneNo?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="motherName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Mother's Name *"
                            fullWidth
                            error={!!errors.motherName}
                            helperText={errors.motherName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="motherphoneNo"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Mother's Phone Number *"
                            fullWidth
                            error={!!errors.motherphoneNo}
                            helperText={errors.motherphoneNo?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={12}>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Address"
                            multiline
                            rows={3}
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {/* STEP 2 */}
              {activeStep === 1 && (
                <>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Academic Details
                  </Typography>

                  <Grid container spacing={3}>
                    {/* Admission Class */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="admissionClass"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Admission Class *"
                            fullWidth
                            error={!!errors.admissionClass}
                            helperText={errors.admissionClass?.message}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                              <MenuItem key={cls} value={cls}>
                                Class {cls}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Section */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="section"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Section *"
                            fullWidth
                            error={!!errors.section}
                            helperText={errors.section?.message}
                          >
                            <MenuItem value="A">Section A</MenuItem>
                            <MenuItem value="B">Section B</MenuItem>
                            <MenuItem value="C">Section C</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Roll Number */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="rollNo"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Roll Number" fullWidth />}
                      />
                    </Grid>

                    {/* Admission Date */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="admissionDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Admission Date *"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : null)}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                error: !!errors.admissionDate,
                                helperText: errors.admissionDate?.message
                              }
                            }}
                          />
                        )}
                      />
                    </Grid>

                    {/* Academic Year */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="academicYear"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Academic Year *"
                            fullWidth
                            error={!!errors.academicYear}
                            helperText={errors.academicYear?.message}
                          >
                            <MenuItem value="2024-2025">2024-2025</MenuItem>
                            <MenuItem value="2025-2026">2025-2026</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Medium */}
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="medium"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} select label="Medium of Instruction" fullWidth>
                            <MenuItem value="english">English</MenuItem>
                            <MenuItem value="hindi">Hindi</MenuItem>
                            <MenuItem value="regional">Regional Language</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>

                  {/* ================= Previous School Details ================= */}
                  <Typography variant="h6" fontWeight={600} mt={4} mb={2}>
                    Previous School Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="prevSchool"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Previous School Name" fullWidth />}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="prevClass"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Previous Class" fullWidth />}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="tcNumber"
                        control={control}
                        render={({ field }) => <TextField {...field} label="TC Number" fullWidth />}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                      <Controller
                        name="passingYear"
                        control={control}
                        render={({ field }) => <TextField {...field} type="number" label="Year of Passing" fullWidth />}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {/* STEP 3 */}
              {activeStep === 2 && (
                <>
                  <Box sx={{ animation: 'fadeIn 0.4s ease-in-out' }}>
                    <Typography variant="h6" fontWeight={600} mb={3}>
                      Fee Details
                    </Typography>

                    <Grid container spacing={3}>
                      {/* Fee Structure */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <Controller
                          name="feeStructure"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Fee Structure *"
                              fullWidth
                              error={!!errors.feeStructure}
                              helperText={errors.feeStructure?.message}
                            >
                              <MenuItem value="regular">Regular (₹45,000 / year)</MenuItem>
                              <MenuItem value="rte">RTE Quota (Free)</MenuItem>
                              <MenuItem value="scholarship">Scholarship (50% discount)</MenuItem>
                              <MenuItem value="staff">Staff Ward (25% discount)</MenuItem>
                            </TextField>
                          )}
                        />
                      </Grid>

                      {/* Payment Mode */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <Controller
                          name="paymentMode"
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} select label="Payment Mode" fullWidth>
                              <MenuItem value="yearly">Yearly</MenuItem>
                              <MenuItem value="quarterly">Quarterly</MenuItem>
                              <MenuItem value="monthly">Monthly</MenuItem>
                            </TextField>
                          )}
                        />
                      </Grid>

                      {/* Admission Fee */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <Controller
                          name="admissionFee"
                          control={control}
                          render={({ field }) => <TextField {...field} type="number" label="Admission Fee (₹)" fullWidth />}
                        />
                      </Grid>

                      {/* Registration Fee */}
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <Controller
                          name="registrationFee"
                          control={control}
                          render={({ field }) => <TextField {...field} type="number" label="Registration Fee (₹)" fullWidth />}
                        />
                      </Grid>
                    </Grid>
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 4,
                        p: 3,
                        bgcolor: 'grey.100',
                        borderRadius: 2
                      }}
                    >
                      <Typography fontWeight={600} mb={2}>
                        Fee Summary
                      </Typography>

                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="text.secondary">Admission Fee</Typography>
                        <Typography>₹{admissionFee}</Typography>
                      </Box>

                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="text.secondary">Registration Fee</Typography>
                        <Typography>₹{registrationFee}</Typography>
                      </Box>

                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="text.secondary">Tuition Fee (Annual)</Typography>
                        <Typography>₹{tuitionFee}</Typography>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight={600}>Total</Typography>
                        <Typography fontWeight={600} color="primary">
                          ₹{totalFee}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </>
              )}

              <Divider sx={{ my: 4 }} />

              <Box display="flex" justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Previous
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                  {activeStep === steps.length - 1 ? 'Complete Admission' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </form>
        </Card>
      </LocalizationProvider>
    </Box>
  );
};

export default StudentAdmission;
