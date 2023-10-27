import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import NewMentionsPlugin from '@/plugins/TransliterationPlugin';
import PrintPlugin from '@/plugins/PrintPlugin';
import './Editor.css';

const EditDocument = () => {
  return (
    <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
      <ScriptSidebar />
      <PrintPlugin />
      <TextEditor />
      <NewMentionsPlugin />
      <AutoFocusPlugin />
      <HistoryPlugin />
    </Stack>
  );
};

export default EditDocument;
