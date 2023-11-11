/* eslint-disable no-unused-vars */
import {
  Button,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  CaretDown,
  Plus,
  Minus,
  HighlighterCircle,
  TextAlignLeft,
  ListBullets,
  ListNumbers,
  AlignLeft,
  Article,
  Image as ImageIcon,
  Link as LinkIcon,
  ArrowUUpLeft,
  ArrowUUpRight,
  ArrowsOut,
  Binoculars,
  MagnifyingGlass,
} from '@phosphor-icons/react';

const LowPriority = 1;
const CustomTextActions = () => {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);
  const handleClick = (formatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };
  return (
    <Stack direction="row">
      {[
        ['B', 'bold'],
        ['I', 'italic'],
        ['U', 'underline'],
        ['A', ''],
        ['pen', ''],
      ].map((value) => {
        return (
          <IconButton
            key={value}
            onClick={() => handleClick(value[1])}
            sx={{ color: 'white' }}
          >
            {value[0] === 'pen' ? (
              <HighlighterCircle size="1rem" />
            ) : (
              <Typography
                fontSize="0.875rem"
                fontWeight={isBold && value[0] === 'B' ? 'bold' : '200'}
                fontStyle={isItalic && value[0] === 'I' ? 'italic' : 'normal'}
                sx={{
                  textDecoration:
                    isUnderline && value[0] === 'U' ? 'underline' : null,
                }}
              >
                {value[0]}
              </Typography>
            )}
          </IconButton>
        );
      })}
    </Stack>
  );
};

const ToolbarPlugin = () => {
  const { palette } = useTheme();
  return (
    <Stack
      height="5.125rem"
      width="100%"
      bgcolor={palette.secondary.main}
      sx={{ position: 'sticky', zIndex: 1 }}
      top="-1.2rem"
    >
      <Stack
        direction="row"
        height="50%"
        width="100%"
        bgcolor={palette.primary.main}
        sx={{ borderTopRightRadius: '0.25rem', borderTopLeftRadius: '0.25rem' }}
        justifyContent={'space-around'}
        divider={
          <Divider
            orientation="vertical"
            sx={{ borderLeft: `1px solid rgba(255,255,255,0.10)` }}
          />
        }
      >
        <Button
          sx={{
            color: 'white',
            fontWeight: '400',
            '& .MuiButton-endIcon': { marginLeft: '0px' },
          }}
          endIcon={<CaretDown size="1.1875rem" />}
        >
          Roboto
        </Button>
        <Button
          sx={{
            color: 'white',
            fontWeight: '400',
          }}
          endIcon={<Plus size="12px" />}
          startIcon={<Minus size="12px" />}
        >
          12
        </Button>
        <CustomTextActions />
        <Stack direction="row">
          {[
            { key: 'ltr', icon: <TextAlignLeft size="1rem" /> },
            { key: 'ul', icon: <ListBullets size="1rem" /> },
            { key: 'ol', icon: <ListNumbers size="1rem" /> },
            { key: 'left', icon: <AlignLeft size="1rem" /> },
            { key: 'artcl', icon: <Article size="1rem" /> },
          ].map((value) => {
            return (
              <IconButton key={value['key']} sx={{ color: 'white' }}>
                {value['icon']}
              </IconButton>
            );
          })}
        </Stack>
        <Stack direction="row">
          {[
            { key: 'img', icon: <ImageIcon size="1rem" /> },
            { key: 'lnk', icon: <LinkIcon size="1rem" /> },
          ].map((value) => {
            return (
              <IconButton key={value['key']} sx={{ color: 'white' }}>
                {value['icon']}
              </IconButton>
            );
          })}
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        height="50%"
        width="100%"
        bgcolor="rgba(36, 36, 36, 0.80)"
        alignItems="center"
        sx={{
          borderBottomRightRadius: '0.25rem',
          borderBottomLeftRadius: '0.25rem',
        }}
        divider={
          <Divider
            orientation="vertical"
            sx={{ borderLeft: `1px solid rgba(255,255,255,0.10)` }}
          />
        }
      >
        <Stack direction="row" gap="1.9rem">
          <IconButton sx={{ color: 'white' }}>
            <ArrowUUpLeft size="1rem" />
          </IconButton>
          <IconButton
            disabled
            sx={{
              color: 'white',
              ':disabled': { color: 'white', opacity: '0.5' },
            }}
          >
            <ArrowUUpRight size="1rem" />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          flexGrow={1}
          justifyContent="space-between"
          px="1rem"
        >
          <Stack direction="row" gap="1.5rem">
            <IconButton sx={{ color: 'white' }}>
              <ArrowsOut size="1rem" />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <Binoculars size="1rem" />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography fontSize="0.75rem" color="white">
              Page
            </Typography>
            <input
              type="text"
              defaultValue="1"
              style={{
                width: '2.25rem',
                textAlign: 'center',
                height: '1.13rem',
                marginLeft: '0.5rem',
                borderRadius: '0.81rem',
                border: 'none',
                color: 'black !important',
                backgroundColor: '#D9D9D9 !important',
              }}
            />
            <Typography
              fontSize="0.75rem"
              color="white"
              sx={{ marginLeft: '0.2rem' }}
            >
              / 76
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="0.8rem">
            <Button
              sx={{
                color: 'white',
                fontWeight: '400',
                fontSize: '0.6rem',
              }}
              endIcon={<Plus size="12px" />}
              startIcon={<Minus size="12px" />}
            >
              100%
            </Button>
            <Input
              id="input-with-icon-adornment"
              inputProps={{
                style: {
                  height: '1.125rem',
                  padding: '0',
                  border: 'none',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '0.81rem',
                },
              }}
              autoFocus={false}
              readOnly
              sx={{
                height: '1.125rem',
                padding: '0',
                width: '7.185rem',
                border: 'none',
                backgroundColor: '#D9D9D9',
                borderRadius: '0.81rem',
                outline: 'none !important',
              }}
              endAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlass size="1rem" />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ToolbarPlugin;
