import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import SceneNode from '@/nodes/SceneNode';
import SubHeaderNode from '@/nodes/SubHeaderNode';
import SluglineNode from '@/nodes/SluglineNode';
import ActionNode from '@/nodes/ActionNode';

import Style from './Editor.module.css';

const EditDocument = () => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [SceneNode, SubHeaderNode, SluglineNode, ActionNode],
    theme: {
      text: {
        bold: Style['text-bold'],
        italic: Style['text-italic'],
        underline: Style['text-underline'],
      },
      subheader: Style['subheader'],
      scene: Style['scene'],
      slugline: Style['slugline'],
      action: Style['action'],
      dialogue: Style['dialogue'],
      parenthetical: Style['parenthetical'],
      transition: Style['transition'],
    },

    onError: (e) => console.error(e),
  };
  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
        {/* Sidebar plugin inside ScriptSidebar */}
        <ScriptSidebar />
        {/* Toolbar Plugin is inside the text editor */}
        <TextEditor />
        <AutoFocusPlugin />
        <HistoryPlugin />
      </Stack>
    </LexicalComposer>
  );
};

export default EditDocument;
