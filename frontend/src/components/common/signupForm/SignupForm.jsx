import { Stack, Typography } from '@mui/material';

import AuthInput from '@common/authInput';
import GradientBtn from '@common/gradientBtn/GradientBtn';

const SignupForm = () => {
  return (
    <Stack component="form" gap="0.94rem" width="100%">
      <Typography variant="h2">Create Account</Typography>
      <AuthInput placeholder="First Name" />
      <AuthInput placeholder="Last Name" />
      <AuthInput placeholder="Email" />
      <AuthInput placeholder="Create Password" />
      <AuthInput placeholder="Repeat Password" />
      <GradientBtn size="extra-large" disableRipple sx={{ mt: { xs: '1.5rem', lg: '3.5rem' } }}>
        Sign Up
      </GradientBtn>
    </Stack>
  );
};

export default SignupForm;
