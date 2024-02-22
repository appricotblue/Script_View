import React, { useState } from 'react';
import IndexHeader from './IndexHeader';
import { Box } from '@mui/material';
import IndexTable from './IndexTable';

const IndexPage = () => {
  const handleSubmit = async (id, tableData) => {
    // console.log("abc");
    if (titleValue.trim() !== '') {
      try {
        const response = await axios.post(
          `${VITE_BASE_URL}/api/scripts/storeOneLineData`,
          {
            title: titleValue,
            scriptId: id,
            oneLiners: tableData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200) {
          console.log('Data stored successfully');
          console.log('Post responce', response.data.oneLiners.oneLiners);
        } else {
          console.error('Failed to store data');
        }
      } catch (error) {
        console.error('Error while making API call:', error);
      }
    } else {
      alert('Enter a title');
    }
  };

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
