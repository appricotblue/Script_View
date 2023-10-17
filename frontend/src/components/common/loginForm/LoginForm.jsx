import { FormLabel, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import { AuthInput, GradientBtn } from '@common';

const LoginForm = () => {
  const { palette } = useTheme();
  return (
    <Stack component="form" gap="0.94rem" width="100%">
      <Typography variant="h2">Sign In</Typography>
      <AuthInput placeholder="Email" />
      <AuthInput placeholder="Password" />
      <Link style={{ textDecoration: 'none' }} to="/login">
        <FormLabel
          sx={{
            fontSize: '1rem',
            color: palette.primary.lowContrastText,
            ':hover': { cursor: 'pointer' },
          }}
        >
          Forgot Password?
        </FormLabel>
      </Link>
      <GradientBtn size="extra-large" disableRipple sx={{ mt: { xs: '0.5rem', lg: '1.31rem' } }}>
        Login
      </GradientBtn>
    </Stack>
  );
};

export default LoginForm;
