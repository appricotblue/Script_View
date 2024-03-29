// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { useMemo, useState, useEffect, useRef } from 'react';
// import { Box, Paper } from '@mui/material';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// import { ScriptErrorBoundary } from '@script';
// import { INSERT_PAGE_BREAK } from '@/plugins/PageBreakPlugin';

// import Style from './TextArea.module.css';
// import { useZoom } from '@/context/ZoomContext';
// import { usePageNumber } from '@/context/PageNumberContext';
// import { $getRoot } from 'lexical';

// const A4_HEIGHT = 938; // Height of an A4 page in pixels

// const TextArea = ({ searchText }) => {
//   // margin in rem
//   const [margin] = useState(3);
//   const [editor] = useLexicalComposerContext();

//   const { zoomLevel } = useZoom();

//   //Auto Page Break
//   const prevHeightRef = useRef(0);

//   const { pageNumber, setPageNum } = usePageNumber()

//   useEffect(() => {
//     // console.log(searchText);
//     const textareaElement = document.querySelector(`.${Style['editor-inner']}`);
//     if (textareaElement) {
//       const observer = new ResizeObserver((entries) => {
//         for (let entry of entries) {
//           const newHeight = entry.contentRect.height;
//           const pageCount = Math.floor(newHeight / A4_HEIGHT);

//           if (pageCount > prevHeightRef.current) {
//             prevHeightRef.current = pageCount; // Update the previous height reference
//             setPageNum(pageCount);
//             // Trigger function when a new A4 page is filled with text
//             editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
//             // editor.update(() => {
//             //   $getRoot().__size(A4_HEIGHT*2)
//             // })
//             // textareaElement.Style
//           } else if (pageCount < prevHeightRef.current) {
//             // Reset the previous height reference after clearing a page break
//             prevHeightRef.current = pageCount;
//             setPageNum(pageCount);
//           }
//         }
//       });

//       observer.observe(textareaElement);

//       return () => {
//         observer.disconnect();
//       };
//     }

//   }, [editor.dispatchCommand, pageNumber, setPageNum, searchText]);

//   const marginLineConf = {
//     hrSideHeight: `calc(100% + ${margin * 2}rem)`,
//     vrSideWidth: `calc(100% + ${margin * 2}rem)`,
//     leftTop: `-${margin}rem`,
//     topLeft: `-${margin}rem`,
//     rightBottom: `-${margin}rem`,
//     bottomRight: `-${margin}rem`,
//   };

//   const CustomContentEditable = useMemo(() => {
//     return (
//       <ContentEditable
//         className={Style['editor-input']}
//         id="#contentEditable"
//       />
//     );
//   }, []);

//   const PlaceHolder = useMemo(() => {
//     return <Box className={Style['editor-placeholder']}>Start Typing...</Box>;
//   }, []);

//   const currentwidth = zoomLevel + 793

//   return (
//     <Paper
//       sx={{
//         width: '793px',
//         minHeight: '938px',
//         boxShadow: '2.99253px 2.99253px 13.46637px 0px rgba(0, 0, 0, 0.10)',
//         display: 'flex',
//         flexDirection: 'column',
//         transform: `scaleX(${zoomLevel / 100})`,
//         position: 'sticky',
//         top: "-2rem",
//       }}
//       className={Style['container']}
//     >
//       <Box
//         height="100%"
//         flexGrow={1}
//         margin={`${margin}rem`}
//         position="relative"
//         className={Style['editor-inner']}
//       >
//         {/* Content Editable */}
//         <RichTextPlugin
//           contentEditable={CustomContentEditable}
//           placeholder={PlaceHolder}
//           ErrorBoundary={ScriptErrorBoundary}
//         ></RichTextPlugin>

//         {/* Margin Lines */}
//         <Box
//           className={`${Style['side']} ${Style['side-left']}`}
//           sx={{
//             top: marginLineConf.leftTop,
//             height: marginLineConf.hrSideHeight,
//           }}
//         ></Box>
//         <Box
//           className={`${Style['side']} ${Style['side-top']}`}
//           sx={{
//             left: marginLineConf.topLeft,
//             width: marginLineConf.vrSideWidth,
//           }}
//         ></Box>
//         <Box
//           className={`${Style['side']} ${Style['side-right']}`}
//           sx={{
//             bottom: marginLineConf.rightBottom,
//             height: marginLineConf.hrSideHeight,
//           }}
//         ></Box>
//         <Box
//           className={`${Style['side']} ${Style['side-bottom']}`}
//           sx={{
//             right: marginLineConf.bottomRight,
//             width: marginLineConf.vrSideWidth,
//           }}
//         ></Box>
//       </Box>
//     </Paper >
//   );
// };

// export default TextArea;


import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ScriptErrorBoundary } from '@script';
import { INSERT_PAGE_BREAK, REMOVE_PAGE_BREAK } from '@/plugins/PageBreakPlugin';

import Style from './TextArea.module.css';
import { useZoom } from '@/context/ZoomContext';
import { usePageNumber } from '@/context/PageNumberContext';
import { $getRoot } from 'lexical';
import { ArrowBack } from '@mui/icons-material';

const A4_HEIGHT = 938; // Height of an A4 page in pixels

const TextArea = ({ searchText }) => {
  // margin in rem
  const [margin] = useState(3);
  const [editor] = useLexicalComposerContext();
  const [count, setCount] = useState(1);

  const [minHeight, setMinHeight] = useState(A4_HEIGHT);
  console.log('height', minHeight);

  const { zoomLevel } = useZoom();

  //Auto Page Break
  const prevHeightRef = useRef(0);

  const { pageNumber, setPageNum } = usePageNumber();

  useEffect(() => {
    // console.log(searchText);
    const textareaElement = document.querySelector(`.${Style['editor-inner']}`);
    console.log(editor.getDecorators());

    if (textareaElement) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newHeight = entry.contentRect.height;
          setMinHeight(newHeight);
          const pageCount = Math.floor(newHeight / A4_HEIGHT);

          if (pageCount > prevHeightRef.current) {
            prevHeightRef.current = pageCount; // Update the previous height reference
            setPageNum(pageCount);
            setCount(pageCount);
            // Trigger function when a new A4 page is filled with text
            // editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
            // editor.toJSON((data) => {
            //   console.log(data.stringify);
            //   // $getRoot().__size(A4_HEIGHT*2)
            // })
          } else if (pageCount < prevHeightRef.current) {
            // Reset the previous height reference after clearing a page break
            // editor.dispatchCommand(REMOVE_PAGE_BREAK, undefined);
            prevHeightRef.current = pageCount;
            setCount(pageCount);
            setPageNum(pageCount);
            setMinHeight(A4_HEIGHT * pageCount);
          }
        }
      });

      observer.observe(textareaElement);

      return () => {
        observer.disconnect();
      };
    }
  }, [editor.dispatchCommand, pageNumber, setPageNum, searchText,]);

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
      <>
        <ContentEditable
          className={Style['editor-input']}
          id="#contentEditable"
        />
      </>
    );
  }, []);

  useEffect(() => {
    setMinHeight(938 * pageNumber);
  }, [pageNumber]);
  console.log('minHeight', minHeight);

  const PlaceHolder = useMemo(() => {
    return <Box className={Style['editor-placeholder']}>Start Typing...</Box>;
  }, []);

  const PageBreak = () => (
    <div style={{ width: '100%', borderTop: '1px dashed #000', marginTop: '20px', marginBottom: '20px' }} />
  );

  const currentwidth = zoomLevel + 793;

  return (
    <Paper
      sx={{
        width: '793px',
        // minHeight: count === 0 ? '938px' : `${minHeight}px`,
        minHeight: '938px',
        // minHeight: `${minHeight}px`,
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
        flexGrow={1}
        margin={`${margin}rem`}
        position="relative"
        className={Style['editor-inner']}
      >

        {/* Content Editable */}
        <RichTextPlugin
          contentEditable={CustomContentEditable}
          placeholder={PlaceHolder}
          ErrorBoundary={ScriptErrorBoundary}
        ></RichTextPlugin>

        {Array.from({ length: pageNumber - 1 }).map((_, index) => (
          <div
            key={index} style={{
              position: 'absolute',
              top: `${965 * (index + 1)}px`,
              left: '-40px',
              display: 'flex',
              width: '780px',
              justifyContent: 'space-between',
              // borderBottom: '1px dashed #000',
            }}
          >
            <div style={{ display: 'flex', gap: '5px', }}>
              {/* <p style={{ borderBottom: '1px dashed #000' }}>Pg</p> */}
              <strong style={{ textAlign: 'center', borderBottom: '1px dashed #000', width: '41px' }}>{index + 1}/{pageNumber}</strong>
            </div>
            <div style={{ borderBottom: '1px dashed #000', width: '41px' }} >
              <strong style={{ textAlign: 'center', width: '41px' }}>{index + 1}/{pageNumber}</strong>

            </div>
          </div>
        ))}

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
