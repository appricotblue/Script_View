import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import LoginForm from '@common/loginForm';
import AuthPageLayout from '@common/authPageLayout';

function Login() {
  return (
    <AuthPageLayout>
      <LoginForm />
      <Box>
        <Typography> Don&apos;t have an account?</Typography>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography fontWeight="700">Create Account</Typography>
        </Link>
      </Box>
    </AuthPageLayout>
  );
}

export default Login;
