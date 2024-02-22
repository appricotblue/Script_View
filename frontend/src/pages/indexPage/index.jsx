import React, { useState } from 'react';
import IndexHeader from './IndexHeader';
import { Box } from '@mui/material';
import IndexTable from './IndexTable';

const IndexPage = () => {
  const [titleValue, setTitleValue] = useState('untitled');

  const [tableModalOpen, setTableModalOpen] = useState(false);

  const handleTitleChange = (newTitle) => {
    setTitleValue(newTitle);
  };

  return (
    // <LexicalComposerContext>
    <Box bgcolor={'whitesmoke'} height={'100vh'} sx={{ overflowY: 'scroll' }}>
      <IndexHeader
        onTitleChange={handleTitleChange}
        titleValue={titleValue}
        setTableModalOpen={setTableModalOpen}
      />
      {/* <IndexHeader /> */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* <IndexTable /> */}
        <IndexTable
          titleValue={titleValue}
          onTitleChange={handleTitleChange}
          tableModalOpen={tableModalOpen}
          setTableModalOpen={setTableModalOpen}
        />
      </Box>
    </Box>
    // </LexicalComposerContext>
  );
};

export default IndexPage;
