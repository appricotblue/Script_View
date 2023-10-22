import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Stack } from '@mui/material';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import SceneNode from '@/nodes/SceneNode';

const EditDocument = () => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [HeadingNode, ListItemNode, ListNode, SceneNode],
    theme: {},

    onError: (e) => console.log('Error: ', e),
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
        <ListPlugin />
      </Stack>
    </LexicalComposer>
  );
};

export default EditDocument;
