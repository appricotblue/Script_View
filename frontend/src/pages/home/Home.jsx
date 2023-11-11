import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetDocList } from '@hooks';
import { DocCard, TemplateCard } from '@common';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => {
    return state.user;
  });
  const { palette } = useTheme();
  const docList = useGetDocList();
  const navigate = useNavigate();
  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <Stack alignItems="center" width="100%" height="90vh">
      <Stack
        direction="row"
        bgcolor={palette.primary.light}
        p="2.25rem 2.5rem 1.44rem 2.5rem"
        width="80%"
        gap="2.3rem"
        borderRadius="0.63rem"
        color={palette.primary.contrastText}
      >
        <Box width="11.8rem">
          <Typography variant="h3" fontWeight={700} fontSize="1.25rem">
            Choose Template
          </Typography>
          <Typography fontSize="1rem" fontWeight="300" mt="0.5rem">
            Select blank page to create a script file from scratch or Choose any
            of our template and customize as per your need
          </Typography>
        </Box>
        <TemplateCard />
      </Stack>
      <Grid
        container
        overflow="auto"
        flexWrap="wrap"
        marginTop="3rem"
        padding="3rem 13rem"
        gap="1rem"
        width="100%"
        flexGrow={1}
        bgcolor={palette.primary.dark}
      >
        {docList.map((item) => {
          return (
            <DocCard
              key={item._id}
              onClick={() => navigate(`/document/${item._id}`)}
              data={item}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Home;
