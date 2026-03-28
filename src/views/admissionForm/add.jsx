// import { useState } from 'react';
// import { Box, Button, Card, CardContent, Stepper, Step, StepLabel, TextField, MenuItem, Typography, Divider, Grid } from '@mui/material';
// import { User, FileText, CreditCard } from 'lucide-react';
// import { MainLayout } from '@/components/layout/MainLayout';
// import { Breadcrumb } from '@/components/layout/Breadcrumb';
// import { toast } from '@/hooks/use-toast';

// const steps = [
//   { label: 'Personal Info', icon: <User size={18} /> },
//   { label: 'Academic Details', icon: <FileText size={18} /> },
//   { label: 'Fee Details', icon: <CreditCard size={18} /> }
// ];

// const StudentAdmission = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prev) => prev + 1);
//     } else {
//       toast({
//         title: 'Admission Successful',
//         description: 'Student has been successfully admitted.'
//       });
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   return (
//     <MainLayout>
//       <Breadcrumb items={[{ label: 'Students', href: '/students' }, { label: 'New Admission' }]} />

//       <Box mb={3}>
//         <Typography variant="h5" fontWeight={600}>
//           New Student Admission
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Complete the admission form for new students
//         </Typography>
//       </Box>

//       {/* Stepper */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Stepper activeStep={activeStep} alternativeLabel>
//             {steps.map((step) => (
//               <Step key={step.label}>
//                 <StepLabel icon={step.icon}>{step.label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </CardContent>
//       </Card>

//       {/* Form */}
//       <Card>
//         <CardContent>
//           {activeStep === 0 && (
//             <Box>
//               <Typography variant="h6" mb={2}>
//                 Personal Information
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="First Name" required />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="Middle Name" />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="Last Name" required />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField select fullWidth label="Gender" required>
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField select fullWidth label="Blood Group">
//                     {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
//                       <MenuItem key={bg} value={bg}>
//                         {bg}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//               </Grid>

//               <Divider sx={{ my: 3 }} />

//               <Typography variant="subtitle1" mb={2} fontWeight={600}>
//                 Parent / Guardian Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Father's Name" required />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Father's Phone" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Mother's Name" required />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Mother's Phone" />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Address" multiline rows={3} />
//                 </Grid>
//               </Grid>
//             </Box>
//           )}

//           {activeStep === 1 && (
//             <Box>
//               <Typography variant="h6" mb={2}>
//                 Academic Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <TextField select fullWidth label="Admission Class" required>
//                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
//                       <MenuItem key={cls} value={cls}>
//                         Class {cls}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField select fullWidth label="Section" required>
//                     <MenuItem value="A">A</MenuItem>
//                     <MenuItem value="B">B</MenuItem>
//                     <MenuItem value="C">C</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth label="Roll Number" />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField fullWidth type="date" label="Admission Date" InputLabelProps={{ shrink: true }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField select fullWidth label="Academic Year">
//                     <MenuItem value="2024-2025">2024-2025</MenuItem>
//                     <MenuItem value="2025-2026">2025-2026</MenuItem>
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}

//           {activeStep === 2 && (
//             <Box>
//               <Typography variant="h6" mb={2}>
//                 Fee Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField select fullWidth label="Fee Structure" required>
//                     <MenuItem value="regular">Regular (₹45,000)</MenuItem>
//                     <MenuItem value="rte">RTE (Free)</MenuItem>
//                     <MenuItem value="scholarship">Scholarship</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField select fullWidth label="Payment Mode">
//                     <MenuItem value="yearly">Yearly</MenuItem>
//                     <MenuItem value="monthly">Monthly</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Admission Fee" type="number" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField fullWidth label="Registration Fee" type="number" />
//                 </Grid>
//               </Grid>
//             </Box>
//           )}

//           <Divider sx={{ my: 3 }} />

//           <Box display="flex" justifyContent="space-between">
//             <Button disabled={activeStep === 0} onClick={handleBack}>
//               Previous
//             </Button>
//             <Box display="flex" gap={2}>
//               <Button variant="outlined">Save as Draft</Button>
//               <Button variant="contained" onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? 'Complete Admission' : 'Next'}
//               </Button>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </MainLayout>
//   );
// };

// export default StudentAdmission;

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Typography,
  Divider,
  Grid,
  Breadcrumbs
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import toast from 'react-hot-toast';
// import { MainLayout } from '@/components/layout/MainLayout';

const steps = [
  { label: 'Personal Info', icon: <PersonIcon /> },
  { label: 'Academic Details', icon: <SchoolIcon /> },
  { label: 'Fee Details', icon: <PaymentsIcon /> }
];

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  fatherName: yup.string().required("Father's name is required"),
  motherName: yup.string().required("Mother's name is required"),
  admissionClass: yup.string().required('Class is required'),
  section: yup.string().required('Section is required'),
  feeStructure: yup.string().required('Fee structure is required')
});

const StudentAdmission = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched'
  });

  const handleNext = async () => {
    const valid = await trigger();
    if (!valid) return;

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      toast({
        title: 'Admission Successful',
        description: 'Student has been successfully admitted.'
      });
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Students', href: '/students' }, { label: 'New Admission' }]} />

      <Box mb={3}>
        <Typography variant="h5" fontWeight={600}>
          New Student Admission
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Complete the admission form for new students
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel icon={step.icon}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Middle Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Gender" fullWidth error={!!errors.gender} helperText={errors.gender?.message}>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="admissionClass"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Class"
                      fullWidth
                      error={!!errors.admissionClass}
                      helperText={errors.admissionClass?.message}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                        <MenuItem key={c} value={c}>
                          Class {c}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Section" fullWidth error={!!errors.section} helperText={errors.section?.message}>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="feeStructure"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Fee Structure"
                      fullWidth
                      error={!!errors.feeStructure}
                      helperText={errors.feeStructure?.message}
                    >
                      <MenuItem value="regular">Regular</MenuItem>
                      <MenuItem value="rte">RTE</MenuItem>
                      <MenuItem value="scholarship">Scholarship</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          )}

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="space-between">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Previous
            </Button>
            <Button variant="contained" onClick={handleSubmit(handleNext)}>
              {activeStep === steps.length - 1 ? 'Complete Admission' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentAdmission;
