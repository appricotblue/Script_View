import { Box, useTheme } from '@mui/material';

const ScriptSidebar = () => {
  const { palette } = useTheme();
  return (
    <Box width="16rem" height="calc(100vh - 4.5rem)" bgcolor={palette.primary.dark}>
      ScriptSidebar
    </Box>
  );
};

export default ScriptSidebar;
