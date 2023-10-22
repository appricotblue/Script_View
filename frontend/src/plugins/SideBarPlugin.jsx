import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  createCommand,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { useEffect } from 'react';
import { Button, useTheme } from '@mui/material';

import SceneNode, { $createSceneNode } from '@/nodes/SceneNode';

export const INSERT_SCENE_COMMAND = createCommand('insert_scene');

const SideBarPlugin = () => {
  const { palette } = useTheme();
  const [editor] = useLexicalComposerContext();

  if (!editor.hasNode(SceneNode)) {
    throw new Error('SidebarPlugin: "SceneNode" not registered on editor');
  }

  useEffect(() => {
    return editor.registerCommand(
      INSERT_SCENE_COMMAND,
      () => {
        // const selection = $getSelection();
        // if ($isRangeSelection(selection)) {
        //   $setBlocksType(selection, $createSceneNode);
        // }
        const selection = $getSelection();
        const nodes = selection.getNodes();

        if ($isRangeSelection(selection)) {
          if (
            nodes.some((node) => node.getType() === SceneNode.getType()) ||
            (nodes.length === 1 && nodes[0].getParent().getType() === SceneNode.getType())
          ) {
            $setBlocksType(selection, $createParagraphNode);
          } else {
            $setBlocksType(selection, $createSceneNode);
          }
        }

        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor]);

  const handleClick = () => {
    editor.dispatchCommand(INSERT_SCENE_COMMAND, undefined);
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{ color: palette.primary.lowContrastText }}
    >
      Insert Scene
    </Button>
  );
};

export default SideBarPlugin;
