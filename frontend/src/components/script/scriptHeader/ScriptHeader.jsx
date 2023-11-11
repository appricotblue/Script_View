import {
  AppBar,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import {
  CaretLeft,
  Keyboard,
  List as ListIcon,
  CaretDown,
  CloudCheck,
  Pencil,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { GradientBtn } from '@common';
import { PRINT_COMMAND } from '@/plugins/PrintPlugin';

const ScriptHeader = () => {
  const { palette } = useTheme();
  const [editor] = useLexicalComposerContext();
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
              flexShrink: 0,
              '& .MuiButton-startIcon': {
                margin: '0.12rem',
              },
            }}
            startIcon={<CaretLeft size="1.5rem" weight="thin" />}
          >
            Back to Home
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Stack direction="row" gap="0.75rem" marginLeft="5rem">
              <Button sx={{ backgroundColor: '#F2F2F2' }}>
                Page Preferences
              </Button>
              <Button
                sx={{
                  fontSize: 14,
                  backgroundColor: '#F2F2F2',
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiButton-endIcon': { marginLeft: '6px' },
                }}
                endIcon={<CaretDown size={12} />}
              >
                <span style={{ marginTop: '-0.125rem' }}>അ</span>{' '}
                <Keyboard size={14} weight="thin" />
              </Button>
              <Button sx={{ backgroundColor: '#F2F2F2' }}>Insert</Button>
            </Stack>
            <Button
              startIcon={<CloudCheck siz={12} />}
              endIcon={<Pencil size={12} weight="thin" />}
              sx={{
                marginLeft: '-5rem',
                '& .MuiButton-endIcon': { marginLeft: '3px' },
                '& .MuiButton-startIcon': { marginRight: '5px' },
              }}
            >
              Jallikkettu Rough Script
            </Button>
            <Stack direction="row" gap="0.94rem">
              <GradientBtn size="large" sx={{ fontWeight: '600' }}>
                Save Template
              </GradientBtn>
              <GradientBtn
                size="large"
                sx={{
                  fontWeight: '600',
                  background: '#000',
                  color: '#fff',
                  ':hover': { background: '#000' },
                }}
                onClick={() => editor.dispatchCommand(PRINT_COMMAND)}
              >
                Share
              </GradientBtn>
            </Stack>
          </Stack>

          {isSmallScreen && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <ListIcon size={32} weight="thin" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isSmallScreen && isDrawerOpen}
        onClose={handleDrawerClose}
      >
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
