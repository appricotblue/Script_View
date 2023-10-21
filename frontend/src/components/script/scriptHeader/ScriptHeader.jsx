import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { CaretLeft, Keyboard, List as ListIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const ScriptHeader = () => {
  const { palette } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <AppBar
        sx={{
          background: palette.secondary.main,
          boxShadow: '0px 0px 17px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        <Toolbar sx={{ height: '4.5rem' }}>
          <Button
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              padding: '0 0.5rem 0 0',
              lineHeight: '1',
              '& .MuiButton-startIcon': {
                margin: '0.12rem',
              },
            }}
            startIcon={<CaretLeft size="1.5rem" weight="thin" />}
          >
            Back to Home
          </Button>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row">
              <Button>Page Preferences</Button>
              <Button sx={{}}>
                അ <Keyboard size={14} weight="thin" />
              </Button>
              <Button>Page Preferences</Button>
            </Stack>
          </Box>
          <input type="search" placeholder="Search..." />
          {isSmallScreen && (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <ListIcon size={32} weight="thin" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isSmallScreen && isDrawerOpen} onClose={handleDrawerClose}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default ScriptHeader;
