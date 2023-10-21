import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { Stack } from '@mui/material';
import { HeadingNode } from '@lexical/rich-text';

import { ScriptSidebar, TextEditor } from '@script';

const EditDocument = () => {
  const lexicalConfig = {
    namespace: 'Script View Text Editor',
    nodes: [HeadingNode],
    theme: {},

    onError: (e) => console.log('Error: ', e),
  };
  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
        <ScriptSidebar />
        <TextEditor />
      </Stack>
    </LexicalComposer>
  );
};

export default EditDocument;
