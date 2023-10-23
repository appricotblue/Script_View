/* eslint-disable no-unused-vars */
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
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
import { TextB, TextUnderline } from '@phosphor-icons/react';

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
    <Box sx={{ marginTop: '10px' }}>
      {[
        ['B', 'bold'],
        ['I', 'italic'],
        ['U', 'underline'],
      ].map((value) => {
        return (
          <IconButton key={value} onClick={() => handleClick(value[1])} sx={{ color: 'white' }}>
            <Typography
              fontSize="1rem"
              fontWeight={isBold && value[0] === 'B' ? 'bold' : '200'}
              fontStyle={isItalic && value[0] === 'I' ? 'italic' : 'normal'}
              sx={{ textDecoration: isUnderline && value[0] === 'U' ? 'underline' : null }}
            >
              {value[0]}
            </Typography>
          </IconButton>
        );
      })}
    </Box>
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
      <Box
        height="50%"
        width="100%"
        bgcolor={palette.primary.main}
        sx={{ borderTopRightRadius: '0.25rem', borderTopLeftRadius: '0.25rem' }}
      >
        <CustomTextActions />
      </Box>
      <Box
        height="50%"
        width="100%"
        bgcolor="rgba(36, 36, 36, 0.80)"
        sx={{ borderBottomRightRadius: '0.25rem', borderBottomLeftRadius: '0.25rem' }}
      ></Box>
    </Stack>
  );
};

export default ToolbarPlugin;
