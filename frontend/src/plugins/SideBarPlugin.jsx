import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  KEY_DOWN_COMMAND,
  createCommand,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { useLayoutEffect } from 'react';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { $findMatchingParent } from '@lexical/utils';

import SceneNode, { $createSceneNode } from '@/nodes/SceneNode';
import SubHeaderNode, { $createSubHeaderNode } from '@/nodes/SubHeaderNode';
import SluglineNode, { $createSluglineNode } from '@/nodes/SluglineNode';
import ActionNode, {
  $createActionNode,
  $isActionNode,
} from '@/nodes/ActionNode';
import {
  $createDialogueContainerNode,
  $isDialogueContainerNode,
} from '@/nodes/DialogueContainerNode';
import TransitionNode, { $createTransitionNode } from '@/nodes/TransitionNode';
import { $createDialogueNode, $isDialogueNode } from '@/nodes/DialogueNode';
import {
  $createParentheticalNode,
  $isParentheticalNode,
} from '@/nodes/ParentheticalNode';

export const INSERT_CONTENT_COMMAND = createCommand('insert-content');

const SideBarPlugin = () => {
  const { palette } = useTheme();
  const [editor] = useLexicalComposerContext();

  const insertContentAction = (payload) => {
    // return if payload is undefined or null
    if (payload === undefined || payload === null) {
      console.error(`payload for INSERT_CONTENT_COMMAND is ${typeof payload}`);
      return true;
    }

    const insertContent = {
      scene: () => handleNodeInsert(SceneNode, $createSceneNode),
      subheader: () => handleNodeInsert(SubHeaderNode, $createSubHeaderNode),
      slugline: () => handleNodeInsert(SluglineNode, $createSluglineNode),
      action: () => handleNodeInsert(ActionNode, $createActionNode),
      transition: () => handleNodeInsert(TransitionNode, $createTransitionNode),

      dialogue: () => {
        const nodes = selection.getNodes();
        console.log(nodes);
        let DContainer;
        let Parenthetical;
        let Dialogue;

        for (const node of nodes) {
          let matchingParent = findDialogueContainerParent(node);
          if (matchingParent) {
            DContainer = matchingParent;
            break;
          }
        }

        if (DContainer) {
          console.log('Contains Dialogue Container parent');
          const dialogue = DContainer.getChildren().find((node) =>
            $isDialogueNode(node),
          );
          if (dialogue) {
            const newContainer = $createDialogueContainerNode();
            const newDia = $createDialogueNode();
            const newPare = $createParentheticalNode();
            DContainer.insertAfter(newContainer.append(newPare, newDia));
            return newPare.select();
          }
          const pare = $findMatchingParent(
            selection.anchor.getNode(),
            (parent) => $isParentheticalNode(parent),
          );
          if (pare) {
            const newDia = $createDialogueNode();
            pare.insertAfter(newDia);
            return newDia.select();
          }
        } else {
          DContainer = $createDialogueContainerNode();
          Parenthetical = $createParentheticalNode();
          Dialogue = $createDialogueNode();
          DContainer.append(Parenthetical, Dialogue);
          $insertNodes([DContainer]);
          return Parenthetical.select();
        }
      },

      parenthetical: () => {},
    };

    function handleNodeInsert(nodeToInsert, createNodeToInsert) {
      const nodesInSelection = selection.getNodes();
      const singleNode =
        nodesInSelection.length === 1 ? nodesInSelection[0] : null;
      const singleNodeParent = singleNode?.getParent();
      const dialogueContainerParent = singleNode
        ? findDialogueContainerParent(singleNode)
        : null;

      if (selection.isCollapsed() && !dialogueContainerParent) {
        if (selection.anchor.getNode().__type === 'text') {
          return $insertNodes([createNodeToInsert()]);
        }

        /** set paragraph blocktype if the current selection contains ActionNode */
        if (
          ($isActionNode(singleNodeParent) ||
            nodesInSelection.some((node) => $isActionNode(node))) &&
          isSameType(ActionNode, nodeToInsert)
        ) {
          return $setBlocksType(selection, $createParagraphNode);
        }

        /** set action blocktype if the current selection node is the same as the node to insert */
        if (
          nodesInSelection.some(
            (node) =>
              node.__type === nodeToInsert?.getType() ||
              singleNodeParent.__type === nodeToInsert.getType(),
          )
        ) {
          return $setBlocksType(selection, $createActionNode);
        }
        return $setBlocksType(selection, createNodeToInsert);
      }

      /** inserts new node after container if the container is DialogueContainerNode */
      if (singleNode) {
        if (dialogueContainerParent) {
          const newNode = createNodeToInsert();
          dialogueContainerParent.insertAfter(newNode);
          return newNode.select();
        }
      }

      return $setBlocksType(selection, createNodeToInsert);
    }

    /** returns parent node that matches the  type. returns null if none is found */
    function findDialogueContainerParent(child) {
      return $findMatchingParent(child, (parent) =>
        $isDialogueContainerNode(parent),
      );
    }

    function isSameType(node1, node2) {
      return node1?.getType() === node2?.getType();
    }

    /** returns if the payload is invalid */
    if (insertContent[payload] === undefined) {
      console.error('invalid payload');
      return true;
    }

    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      insertContent[payload]();
    }

    return true;
  };

  useLayoutEffect(() => {
    const removeInsertContentListener = editor.registerCommand(
      INSERT_CONTENT_COMMAND,
      insertContentAction,
      COMMAND_PRIORITY_NORMAL,
    );

    const removeKeyDownListener = editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if ((event.ctrlKey || event.metaKey) && event.altKey) {
          const payload = {
            KeyA: 'action',
            KeyS: 'slugline',
            KeyH: 'subheader',
            KeyN: 'scene',
            KeyT: 'transition',
            KeyD: 'dialogue',
          }[event.code];
          if (payload) {
            event.preventDefault();
            editor.dispatchCommand(INSERT_CONTENT_COMMAND, payload);
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
    return () => {
      removeInsertContentListener();
      removeKeyDownListener();
    };
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
          ':before': {
            borderTop: `thin dashed ${palette.primary.lowContrastText}`,
          },
          ':after': {
            borderTop: `thin dashed ${palette.primary.lowContrastText}`,
          },
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
              ({combo[node.join('').toLocaleLowerCase()]})
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
