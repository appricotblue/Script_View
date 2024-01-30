import React from 'react';
import IndexHeader from './IndexHeader';
import IndexTable from './IndexTable';
import { WithHeaderMargin } from '@common';
import { Box } from '@mui/material';

const IndexPage = () => {
  return (
    <Box bgcolor={'whitesmoke'}>
      <IndexHeader />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IndexTable />
      </Box>
    </Box>
  )
}

export default IndexPage;