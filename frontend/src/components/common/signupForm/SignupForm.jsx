import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthInput, GradientBtn } from '@common';
import { setLogin } from '@/store/slices/userSlice';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Stack component="form" gap="0.94rem" width="100%">
      <Typography variant="h2">Create Account</Typography>
      <AuthInput placeholder="First Name" />
      <AuthInput placeholder="Last Name" />
      <AuthInput placeholder="Email" />
      <AuthInput placeholder="Create Password" />
      <AuthInput placeholder="Repeat Password" />
      <GradientBtn
        size="extra-large"
        disableRipple
        sx={{ mt: { xs: '1.5rem', lg: '3.5rem' } }}
        onClick={() => {
          dispatch(setLogin(true));
          navigate('/');
        }}
      >
        Sign Up
      </GradientBtn>
    </Stack>
  );
};

export default SignupForm;
