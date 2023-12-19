import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';

import { ScriptErrorBoundary } from '@script';

import Style from './TextArea.module.css';

const A4_HEIGHT = 938; // Height of an A4 page in pixels

const TextArea = () => {
  // margin in rem
  const [margin] = useState(3);
  //Chatgpt
  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   const textareaElement = document.querySelector(`.${Style['editor-inner']}`);
  //   if (textareaElement) {
  //     const observer = new ResizeObserver((entries) => {
  //       for (let entry of entries) {
  //         const newHeight = entry.contentRect.height;
  //         const pageCount = Math.floor(newHeight / A4_HEIGHT); // Calculate number of A4 pages

  //         if (pageCount > height) {
  //           editor.dispatchCommand(INSERT_PAGE_BREAK, undefined); // Trigger function when a new A4 page is filled with text
  //           setHeight(pageCount); // Update the A4 page count
  //         }
  //       }
  //     });

  //     observer.observe(textareaElement);

  //     return () => {
  //       observer.disconnect();
  //     };
  //   }
  // }, [height]);
  //Chat gpt

  // TODO - Remove this temporary code
  const contRef = useRef(null);
  const [pinPoints, setPinPoints] = useState([{ id: 0, top: 0 }]);
  useEffect(() => {
    const calculatePinPoints = () => {
      if (contRef.current) {
        const containerHeight = contRef.current.clientHeight;
        const existingPinPoints = pinPoints.length;

        // Calculate the number of additional page counts needed
        const additionalPinPoints = Math.floor(
          (containerHeight - existingPinPoints * A4_HEIGHT) / A4_HEIGHT + 1,
        );
        console.log({ additionalPinPoints });

        // Create new page counts and update the state
        setPinPoints([
          { id: 0, top: 0 },
          ...Array.from({ length: additionalPinPoints }, (_, index) => {
            console.log({
              id: existingPinPoints + index,
              top: index + 1,
            });
            return {
              id: existingPinPoints + index, // Ensure unique id
              top: (index + 1) * A4_HEIGHT - 10, // Adjust for the page count size
            };
          }),
        ]);
      }
    };

    // Initial page count setup
    calculatePinPoints();

    // Watch for size changes using ResizeObserver
    const resizeObserver = new ResizeObserver(calculatePinPoints);
    if (contRef.current && contRef.current.parentElement) {
      resizeObserver.observe(contRef.current.parentElement);
    }

    return () => {
      // Disconnect the ResizeObserver when the component unmounts
      resizeObserver.disconnect();
    };
  }, []);
  const marginLineConf = {
    hrSideHeight: `calc(100% + ${margin * 2}rem)`,
    vrSideWidth: `calc(100% + ${margin * 2}rem)`,
    leftTop: `-${margin}rem`,
    topLeft: `-${margin}rem`,
    rightBottom: `-${margin}rem`,
    bottomRight: `-${margin}rem`,
  };
  const CustomContentEditable = useMemo(() => {
    return (
      <ContentEditable
        className={Style['editor-input']}
        id="#contentEditable"
      />
    );
  }, []);
  const PlaceHolder = useMemo(() => {
    return <Box className={Style['editor-placeholder']}>Start Typing...</Box>;
  }, []);
  return (
    <Paper
      sx={{
        width: '793px',
        minHeight: '938px',
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
        ref={contRef}
      >
        {pinPoints.map((point, index) => (
          <div
            key={point.id}
            style={{
              position: 'absolute',
              top: `${point.top}px`,
              left: '-10px',
            }}
          >
            {index + 1}
          </div>
        ))}
        {/* Content Editable */}
        <RichTextPlugin
          contentEditable={CustomContentEditable}
          placeholder={PlaceHolder}
          ErrorBoundary={ScriptErrorBoundary}
        />

        {/* Margin Lines */}
        <Box
          className={`${Style['side']} ${Style['side-left']}`}
          sx={{
            top: marginLineConf.leftTop,
            height: marginLineConf.hrSideHeight,
          }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-top']}`}
          sx={{
            left: marginLineConf.topLeft,
            width: marginLineConf.vrSideWidth,
          }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-right']}`}
          sx={{
            bottom: marginLineConf.rightBottom,
            height: marginLineConf.hrSideHeight,
          }}
        ></Box>
        <Box
          className={`${Style['side']} ${Style['side-bottom']}`}
          sx={{
            right: marginLineConf.bottomRight,
            width: marginLineConf.vrSideWidth,
          }}
        ></Box>
      </Box>
    </Paper>
  );
};

export default TextArea;
