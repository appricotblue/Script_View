import { Box, Icon, Paper, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const TemplateCard = () => {
  const { palette } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isLoading) return e.stopPropagation();
    setLoading(true);
    const id = v4();
    fetch(`${VITE_BASE_URL}/api/scripts/create/${id}`)
      .then(async (response) => {
        const { id } = await response.json();
        navigate(`/document/${id}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Box color={palette.primary.contrastText}>
      <Paper
        component="a"
        sx={{
          width: '7.875rem',
          height: '9rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '4px 4px 11px 0px #000',
          ':hover': {
            cursor: 'pointer',
          },
        }}
        onClick={handleClick}
      >
        <Icon fontSize="large">
          <Plus />
        </Icon>
      </Paper>
      <Typography variant="h6" fontSize="0.935rem" fontWeight={500} marginTop="0.38rem">
        Blank Page
      </Typography>
    </Box>
  );
};

TemplateCard.propTypes = {};

export default TemplateCard;
