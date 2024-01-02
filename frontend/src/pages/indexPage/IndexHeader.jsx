import { GradientBtn, InlineEditable } from '@common';
import { AppBar, Button, Drawer, IconButton, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { CaretDown, CaretLeft, Keyboard, List as ListIcon } from '@phosphor-icons/react';
import AddCharacterModal from '@script/addCharacterModal/AddCharacterModal';
import React, { useState } from 'react';

const IndexHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const { palette } = useTheme();
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    // manage inline editable
  const onTitleBlur = () => {
    if (!id) {
      throw new Response('id not found', { status: 404 });
    }
    if (socket && socket.connected) {
      if (titleValue != '') {
        socket.emit('edit-title', { title: titleValue, id });
      }
    } else {
      console.error('socket connection not open');
    }
  }

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
                        alignItems="center"
                        width="100%"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <Stack direction="row" gap="0.75rem" marginLeft="5rem">
                            <Button
                                sx={{ backgroundColor: '#F2F2F2', height: 'fit-content' }}
                            >
                                Go to Script
                            </Button>
                            {/* <AddCharacterModal socket={socket} id={id} /> */}
                        </Stack>
                        <InlineEditable
                            onBlur={onTitleBlur}
                            onChange={(e) => setTitleValue(e.target.value)}
                            value='Jellikettu Rough Script'
                        />
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
                                Download
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
    )
}

export default IndexHeader;