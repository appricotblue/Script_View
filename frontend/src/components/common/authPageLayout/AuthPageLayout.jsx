import { useTheme } from '@emotion/react';
import { Box, Hidden, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import full_logo_image from '@assets/images/complete_logo.png';
import auth_bg_image from '@assets/images/auth_bg_image.jpeg';

const AuthPageLayout = ({ children }) => {
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
        justifyContent="center"
        mt={{ xs: '-20%', lg: '-5%' }}
      >
        <Box width="9.4rem" height="3.3rem" ml="-0.5rem">
          <Box width="100%" height="100%" component="img" src={full_logo_image} />
        </Box>
        {children}
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
};

AuthPageLayout.propTypes = {
  children: PropTypes.element,
};
export default AuthPageLayout;
