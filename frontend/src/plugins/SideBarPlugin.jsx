import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  KEY_DOWN_COMMAND,
  createCommand,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { useEffect } from 'react';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';

import SceneNode, { $createSceneNode } from '@/nodes/SceneNode';
import SubHeaderNode, { $createSubHeaderNode } from '@/nodes/SubHeaderNode';
import SluglineNode, { $createSluglineNode } from '@/nodes/SluglineNode';
import ActionNode, { $createActionNode } from '@/nodes/ActionNode';
import DialogueContainerNode, { $createDialogueContainerNode } from '@/nodes/DialogueContainerNode';

export const INSERT_CONTENT_COMMAND = createCommand('insert-content');

const SideBarPlugin = () => {
  const { palette } = useTheme();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_CONTENT_COMMAND,
      (payload) => {
        // return if payload is undefined or null
        if (payload === undefined || payload === null) {
          console.error(`payload for INSERT_CONTENT_COMMAND is ${typeof payload}`);
          return true;
        }
        // object literal lookup
        const insertContent = {
          scene: () => {
            const nodes = selection.getNodes();
            if (
              nodes.some((node) => node.__type === SceneNode.getType()) ||
              (nodes.length === 1 && nodes[0].getParent().getType() === SceneNode.getType())
            ) {
              $setBlocksType(selection, $createParagraphNode);
            } else {
              $setBlocksType(selection, $createSceneNode);
            }
          },
          subheader: () => {
            const nodes = selection.getNodes();
            if (
              nodes.some((node) => node.__type === SubHeaderNode.getType()) ||
              (nodes.length === 1 && nodes[0].getParent().getType() === SubHeaderNode.getType())
            ) {
              $setBlocksType(selection, $createParagraphNode);
            } else {
              $setBlocksType(selection, $createSubHeaderNode);
            }
          },
          slugline: () => {
            const nodes = selection.getNodes();
            if (
              nodes.some((node) => node.__type === SluglineNode.getType()) ||
              (nodes.length === 1 && nodes[0].getParent().getType() === SluglineNode.getType())
            ) {
              $setBlocksType(selection, $createParagraphNode);
            } else {
              $setBlocksType(selection, $createSluglineNode);
            }
          },
          action: () => {
            const nodes = selection.getNodes();
            if (
              nodes.some((node) => node.__type === ActionNode.getType()) ||
              (nodes.length === 1 && nodes[0].getParent().getType() === ActionNode.getType())
            ) {
              $setBlocksType(selection, $createParagraphNode);
            } else {
              $setBlocksType(selection, $createActionNode);
            }
          },
          dialogue: () => {
            const nodes = selection.getNodes();
            if (
              nodes.some((node) => node.__type === DialogueContainerNode.getType()) ||
              (nodes.length === 1 &&
                nodes[0].getParent().getType() === DialogueContainerNode.getType())
            ) {
              $setBlocksType(selection, $createParagraphNode);
            } else {
              $setBlocksType(selection, $createDialogueContainerNode);
            }
          },
          parenthetical: () => {},
          transition: () => {},
        };

        // return if the payload is invalid
        if (insertContent[payload] === undefined) {
          console.error('invalid payload');
          return true;
        }

        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          insertContent[payload]();
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor]);
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      console.log(editorState.toJSON());
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if ((event.ctrlKey || event.metaKey) && event.altKey) {
          const payload = {
            KeyA: 'action',
            KeyS: 'slugline',
            KeyH: 'subheader',
            KeyN: 'scene',
          }[event.code];
          if (payload) {
            console.log(payload);
            event.preventDefault();
            editor.dispatchCommand(INSERT_CONTENT_COMMAND, payload);
            return true;
          }
        }

        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor]);

  const handleClick = (payload) => {
    editor.dispatchCommand(INSERT_CONTENT_COMMAND, payload);
  };
  return (
    <Stack gap="1rem" padding="1.5rem 1.45rem 0 1.5rem">
      <Divider
        component="span"
        sx={{
          color: palette.primary.lowContrastText,
          ':before': { borderTop: `thin dashed ${palette.primary.lowContrastText}` },
          ':after': { borderTop: `thin dashed ${palette.primary.lowContrastText}` },
        }}
      >
        Components
      </Divider>
      {[
        ['Scene'],
        ['Sub', 'Header'],
        ['Slugline'],
        ['Action'],
        ['Dialogue'],
        ['Parenthetical'],
        ['Transition'],
      ].map((node) => {
        const combo = {
          scene: 'Ctrl + Alt + N',
          subheader: 'Ctrl + Alt + H',
          slugline: 'Ctrl + Alt + S',
          action: 'Ctrl + Alt + A',
          dialogue: 'Ctrl + Alt + D',
          parenthetical: 'Ctrl + Alt + P',
          transition: 'Ctrl + Alt + T',
        };
        return (
          <Button
            key={node.join('')}
            onClick={() => handleClick(node.join('').toLowerCase())}
            variant="contained"
            sx={{
              color: palette.primary.lowContrastText,
              display: 'block',
              padding: '0.7rem 0.8rem',
              textAlign: 'start',
              border: '1px solid #ffffff1f',
              borderImageSlice: 1,
              borderRadius: '0.38rem',
              boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.37)',
            }}
          >
            <Typography component="span" fontSize="0.75rem" fontWeight="200">
              Scene Number ({combo[node.join('').toLocaleLowerCase()]})
            </Typography>
            <Typography
              component="span"
              sx={{ display: 'block' }}
              fontSize="1.125rem"
              fontWeight="500"
            >
              {node.join(' ')}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
};

export default SideBarPlugin;
