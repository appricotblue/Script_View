import './Editor.css';
import { Box, Stack } from '@mui/material';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ScriptSidebar, TextEditor } from '@script';
import TextSuggestionPlugin from '@/plugins/TextSuggestionsPlugin';
import PrintPlugin from '@/plugins/PrintPlugin';
import AutoSavePlugin from '@/plugins/AutoSavePlugin';
import useOnlineStatus from '@/utils/hooks/useOnlineStatus';
import PageBreakPlugin from '@/plugins/PageBreakPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useZoom } from '@/context/ZoomContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditDocument = () => {

  const isOnline = useOnlineStatus();
  const { enlargeValue, showSidebars } = useZoom();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    if (!userId) {
      return navigate('/login')
    }
  }, [])

  if (isOnline)
    return (
      <Stack display="flex" direction="row" width="100%" maxHeight="100vh">
        {showSidebars && <ScriptSidebar />}
        <Box sx={{ transform: `scale(${enlargeValue / 100})`, width: '100%', }}><TextEditor /></Box>
        {/* <TextEditor/> */}
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
