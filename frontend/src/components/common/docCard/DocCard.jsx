import { Box, Stack, useTheme } from '@mui/material';

const DocCard = ({ onClick, data }) => {
  const { palette } = useTheme();
  return (
    <Stack
      height="16rem"
      width="16rem"
      borderRadius="0.4rem"
      component="a"
      onClick={onClick}
    >
      <Box
        width="100%"
        height="70%"
        sx={{ backgroundColor: palette.secondary.main }}
      ></Box>
      <Box
        width="100%"
        height="30%"
        sx={{
          backgroundColor: palette.primary.light,
          color: palette.primary.contrastText,
        }}
      >
        {data.title}
      </Box>
    </Stack>
  );
};
DocCard.propTypes = {};
export default DocCard;
