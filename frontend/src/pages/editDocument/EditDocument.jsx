import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { ScriptSidebar, TextEditor } from '@script';
import NewMentionsPlugin from '@/plugins/TransliterationPlugin';
import PrintPlugin from '@/plugins/PrintPlugin';
import AutoSavePlugin from '@/plugins/AutoSavePlugin';
import './Editor.css';
import FetchInitialStatePlugin from '@/plugins/FetchInitialStatePlugin';

const EditDocument = () => {
  return (
    <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
      <ScriptSidebar />
      <TextEditor />
      <AutoSavePlugin />
      <FetchInitialStatePlugin />
      <NewMentionsPlugin />
      <PrintPlugin />
      <AutoFocusPlugin />
      <HistoryPlugin />
    </Stack>
  );
};

export default EditDocument;
