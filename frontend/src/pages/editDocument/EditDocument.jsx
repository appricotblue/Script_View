import './Editor.css';
import { Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ScriptSidebar, TextEditor } from '@script';
import TextSuggestionPlugin from '@/plugins/TextSuggestionsPlugin';
import PrintPlugin from '@/plugins/PrintPlugin';
import AutoSavePlugin from '@/plugins/AutoSavePlugin';
import useOnlineStatus from '@/utils/hooks/useOnlineStatus';
import PageBreakPlugin from '@/plugins/PageBreakPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';


const EditDocument = () => {
  const isOnline = useOnlineStatus();
  if (isOnline)
    return (
      <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
        <ScriptSidebar />
        <TextEditor />
        <AutoSavePlugin />
        <TextSuggestionPlugin />
        <PrintPlugin />
        <PageBreakPlugin />
        <AutoFocusPlugin />
        <TablePlugin />
        <HistoryPlugin />
      </Stack>
    );
  return <div>You are offline</div>;
};

export default EditDocument;
