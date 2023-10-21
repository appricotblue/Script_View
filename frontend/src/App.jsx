import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// import { PreLoader } from '@common';

function App() {
  return (
    <>
      {/* <PreLoader /> */}
      {/* set opacity of main to 0 when using preloader */}
      <Box id="main" marginTop="4.5rem">
        <Outlet />
      </Box>
    </>
  );
}

export default App;
