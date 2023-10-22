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
      {['Bold', 'Italic', 'Underline', 'Highlight'].map((value) => {
        return (
          <IconButton
            key={value}
            onClick={() => handleClick(value.toLowerCase())}
            sx={{ color: 'white' }}
          >
            {value === 'Bold' ? (
              <Typography fontSize="1rem" fontWeight={isBold ? 'bold' : '200'}>
                B
              </Typography>
            ) : value === 'Italic' ? (
              <Typography fontSize="1rem" fontStyle={isItalic ? 'italic' : 'normal'}>
                I
              </Typography>
            ) : value === 'Underline' ? (
              <TextUnderline size="1rem" weight={isUnderline ? 'bold' : 'thin'} />
            ) : null}
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
      borderRadius="0.25rem"
    >
      <Box height="50%" width="100%" bgcolor={palette.primary.main}>
        <CustomTextActions />
      </Box>
      <Box height="50%" width="100%" bgcolor="rgba(36, 36, 36, 0.80)"></Box>
    </Stack>
  );
};

export default ToolbarPlugin;
