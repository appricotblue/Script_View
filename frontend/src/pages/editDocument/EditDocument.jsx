import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import SceneNode from '@/nodes/SceneNode';
import SubHeaderNode from '@/nodes/SubHeaderNode';
import SluglineNode from '@/nodes/SluglineNode';
import ActionNode from '@/nodes/ActionNode';
import NewMentionsPlugin from '@/plugins/TransliterationPlugin';
import { MentionNode } from '@/nodes/MentionNode';
import PrintPlugin from '@/plugins/PrintPlugin';
import './Editor.css';

const EditDocument = () => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [SceneNode, SubHeaderNode, SluglineNode, ActionNode, MentionNode],
    theme: {
      text: {
        bold: 'text-bold',
        italic: 'text-italic',
        underline: 'text-underline',
      },
      subheader: 'subheader',
      scene: 'scene',
      slugline: 'slugline',
      action: 'action',
      dialogue: 'dialogue',
      parenthetical: 'parenthetical',
      transition: 'transition',
    },

    onError: (e) => console.error(e),
  };
  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
        {/* Sidebar plugin inside ScriptSidebar */}
        <ScriptSidebar />
        <PrintPlugin />
        {/* Toolbar Plugin is inside the text editor */}
        <TextEditor />
        <NewMentionsPlugin />
        <AutoFocusPlugin />
        <HistoryPlugin />
      </Stack>
    </LexicalComposer>
  );
};

export default EditDocument;
