import { useTheme } from '@emotion/react';
import { Box, Hidden, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import LoginForm from '@common/loginForm';

import full_logo_image from '@assets/images/complete_logo.png';
import auth_bg_image from '@assets/images/auth_bg_image.jpeg';

function Login() {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <Stack
      component="main"
      direction="row"
      height="100vh"
      overflow="hidden"
      bgcolor={primary.main}
      color={primary.contrastText}
    >
      <Stack
        width={{ lg: '34.625%', xs: '100%' }}
        p="6rem 4.88rem"
        gap="2.5rem"
        alignItems={{ xs: 'center', lg: 'unset' }}
      >
        <Box width="9.4rem" height="3.3rem" ml="-0.5rem">
          <Box width="100%" height="100%" component="img" src={full_logo_image} />
        </Box>
        <LoginForm />
        <Box>
          <Typography> Don&apos;t have an account?</Typography>
          <Link to="/">navigate</Link>
        </Box>
      </Stack>
      <Hidden lgDown>
        <Box
          flexGrow={1}
          sx={{
            backgroundImage: `url(${auth_bg_image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionX: '100%',
          }}
          alt="script writing"
        />
      </Hidden>
    </Stack>
  );
}

export default Login;
