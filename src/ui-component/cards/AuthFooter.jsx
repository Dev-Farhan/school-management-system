// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  return (
    <Stack direction="row" sx={{ justifyContent: 'center' }}>
      {/* <Typography variant="subtitle2" component={Link} href="#" target="_blank" underline="hover">
       
      </Typography> */}
      <Typography
        variant="subtitle2"
        component={Link}
        href="https://www.linkedin.com/in/mohd-farhan0678?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        target="_blank"
        underline="hover"
      >
        Made with ❤️ by Dev-Farhan
      </Typography>
    </Stack>
  );
}
