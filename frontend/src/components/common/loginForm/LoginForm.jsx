import { FormLabel, Stack, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthInput, GradientBtn } from '@common';
import { setLogin } from '@/store/slices/userSlice';

const LoginForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <GradientBtn
        size="extra-large"
        disableRipple
        sx={{ mt: { xs: '0.5rem', lg: '1.31rem' } }}
        onClick={() => {
          dispatch(setLogin(true));
          navigate('/');
        }}
      >
        Login
      </GradientBtn>
    </Stack>
  );
};

export default LoginForm;
