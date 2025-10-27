import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { supabase } from '../../../utils/supabaseClient';
// ===============================|| JWT - LOGIN ||=============================== //

// form validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
    .required('Email address is required')
    .trim(),
  password: yup
    .string()
    .required('Password is required')
    // .min(6, 'Password must be at least 6 characters')
    // .max(50, 'Password must not exceed 50 characters')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    // )
    .trim(),
  remember: yup.boolean().default(false).nullable()
});

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: 'aimwinschool@gmail.com',
      password: 'aimwin',
      remember: true
    }
  });

  const onSubmit = async (formData) => {
    try {
      const { email, password } = formData;
      let { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        toast.error(error?.message);
        console.error('Signin Error:', error.message);
        return;
      }
      reset();
      toast.success('User login succesfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(errors.email)}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <OutlinedInput {...field} id="outlined-adornment-email-login" type="email" label="Email Address" />}
        />
        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(errors.password)}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} checked={field.value} color="primary" />} label="Keep me logged in" />
            )}
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
