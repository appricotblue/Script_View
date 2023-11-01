import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useMemo, useState } from 'react';
import { Box, Paper } from '@mui/material';

import useOnlineStatus from '@/utils/hooks/useOnlineStatus';

import Style from './TextArea.module.css';

const TextArea = () => {
  // margin in rem
  const [margin, setMargin] = useState(3);
  const marginLineConf = {
    hrSideHeight: `calc(100% + ${margin * 2}rem)`,
    vrSideWidth: `calc(100% + ${margin * 2}rem)`,
    leftTop: `-${margin}rem`,
    topLeft: `-${margin}rem`,
    rightBottom: `-${margin}rem`,
    bottomRight: `-${margin}rem`,
  };
  const CustomContentEditable = useMemo(() => {
    return <ContentEditable className={Style['editor-input']} />;
  }, []);
  const PlaceHolder = useMemo(() => {
    return <Box className={Style['editor-placeholder']}>Start Typing...</Box>;
  }, []);
  return (
    <Paper
      sx={{
        width: '40rem',
        height: '55.5rem',
        boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={Style['container']}
    >
      <Box
        height="100%"
        flexGrow={1}
        margin={`${margin}rem`}
        position="relative"
        className={Style['editor-inner']}
      >
        {/* Content Editable */}
        <RichTextPlugin
          contentEditable={CustomContentEditable}
          placeholder={PlaceHolder}
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* Margin Lines */}
        <Box
          className={`${Style['side']} ${Style['side-left']}`}
          sx={{ top: marginLineConf.leftTop, height: marginLineConf.hrSideHeight }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-top']}`}
          sx={{ left: marginLineConf.topLeft, width: marginLineConf.vrSideWidth }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-right']}`}
          sx={{ bottom: marginLineConf.rightBottom, height: marginLineConf.hrSideHeight }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-bottom']}`}
          sx={{ right: marginLineConf.bottomRight, width: marginLineConf.vrSideWidth }}
        ></Box>
      </Box>
    </Paper>
  );
};

export default TextArea;
