import { Box, useTheme } from '@mui/material';

import SideBarPlugin from '@/plugins/SideBarPlugin';

const ScriptSidebar = () => {
  const { palette } = useTheme();
  return (
    <Box
      width="16rem"
      height="calc(100vh - 4.5rem)"
      bgcolor={palette.primary.dark}
      sx={{
        overflowY: 'auto',
        paddingBottom: '20px'
      }}
    >
      <SideBarPlugin />
    </Box>
  );
};

export default ScriptSidebar;
