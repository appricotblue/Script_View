import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { INSERT_PAGE_BREAK } from '@/plugins/PageBreakPlugin';
import { usePageNumber } from '@/context/PageNumberContext';
import { useZoom } from '@/context/ZoomContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { ScriptErrorBoundary } from '@script';
import Style from './TextArea.module.css';

const A4_HEIGHT = 938; // Height of an A4 page in pixels

const TextArea2 = ({ searchText }) => {
  const [pages, setPages] = useState([{ id: 1, content: '' }]);
  const { pageNumber, setPageNum } = usePageNumber();
  const { zoomLevel } = useZoom();

  useEffect(() => {
    const lastPage = pages[pages.length - 1];
    const pageContent = lastPage.content.trim();
    if (pageContent !== '' && pageContent.length >= A4_HEIGHT) {
      const newPageNum = lastPage.id + 1;
      setPages([...pages, { id: newPageNum, content: '' }]);
      setPageNum(newPageNum);
    }
  }, [pages, setPageNum]);

  const handleContentChange = (pageId, content) => {
    const updatedPages = pages.map((page) =>
      page.id === pageId ? { ...page, content } : page,
    );
    setPages(updatedPages);
  };

  const renderPages = () => {
    return pages.map((page) => (
      <Paper
        key={page.id}
        sx={{
          width: '793px',
          minHeight: '938px',
          overflowY: 'hidden',
          boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
          display: 'flex',
          flexDirection: 'column',
          transform: `scaleX(${zoomLevel / 100})`,
          position: 'sticky',
          top: '-2rem',
        }}
        className={Style['container']}
      >
        <Box
          height="100%"
          margin="3rem"
          position="relative"
          className={Style['editor-inner']}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={Style['editor-input']}
                id={`#contentEditable${page.id}`}
                value={page.content}
                onChange={(e) => handleContentChange(page.id, e.target.value)}
              />
            }
            placeholder={
              <Box className={Style['editor-placeholder']}>Start Typing...</Box>
            }
            ErrorBoundary={ScriptErrorBoundary}
          ></RichTextPlugin>
        </Box>
      </Paper>
    ));
  };

  return <div>{renderPages()}</div>;
};

export default TextArea2;
