import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import SceneNode from '@/nodes/SceneNode';
import SubHeaderNode from '@/nodes/SubHeaderNode';
import SluglineNode from '@/nodes/SluglineNode';
import ActionNode from '@/nodes/ActionNode';

const EditDocument = () => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [SceneNode, SubHeaderNode, SluglineNode, ActionNode],
    theme: {},

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
