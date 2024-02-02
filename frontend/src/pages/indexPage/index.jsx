import React from 'react';
import IndexHeader from './IndexHeader';
import IndexTable from './IndexTable';
import { WithHeaderMargin } from '@common';
import { Box } from '@mui/material';
import TextSuggestionPlugin from '@/plugins/TextSuggestionsPlugin';
import { LexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import MemoizedIndexTable from './IndexTable';

const IndexPage = () => {
  return (
    // <LexicalComposerContext>
      <Box bgcolor={'whitesmoke'}>
        {/* <IndexHeader /> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <IndexTable /> */}
        <MemoizedIndexTable />
        </Box>
      </Box>
    // </LexicalComposerContext>
  )
}

export default IndexPage;