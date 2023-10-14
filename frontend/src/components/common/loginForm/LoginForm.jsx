import { Box, FormLabel, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import AuthInput from '@common/authInput';
import GradientBtn from '@common/gradientBtn/GradientBtn';

const LoginForm = () => {
  const { palette } = useTheme();
  return (
    <Box>
      <Stack component="form" gap="0.94rem">
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
        <GradientBtn size="extra-large" disableRipple>
          Login
        </GradientBtn>
      </Stack>
    </Box>
  );
};

export default LoginForm;
