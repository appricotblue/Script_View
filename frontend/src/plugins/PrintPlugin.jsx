import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import { useParams } from 'react-router-dom';
import { COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';

export const PRINT_COMMAND = createCommand('print-command');

const PrintPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { id } = useParams();

  const contRef = useRef(null);

  useEffect(() => {
    return editor.registerCommand(
      PRINT_COMMAND,
      () => {
        editor.update(() => {
          // convert editor state into html
          const htmlString = $generateHtmlFromNodes(editor, null);

          // accesses container that should carry the generated html and assigns the generated html
          const container = contRef.current;
          container.style.visibility = 'visible';
          container.innerHTML = htmlString;

          // generate canvas
          html2canvas(container, { scale: 2 }).then((canvas) => {
            // create an image to save into pdf
            console.log(canvas);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPdf({
              format: 'a4',
              unit: 'mm',
              orientation: 'portrait',
              compress: true,
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgwidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgwidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgwidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage({
              format: 'JPEG',
              imageData: imgData,
              x: imgX,
              y: imgY,
              width: imgwidth * ratio,
              height: imgHeight * ratio,
            });
            pdf.save(`document-${id}.pdf`);

            container.style.visibility = 'hidden';
          });
        });
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, id]);
  return (
    <>
      <div
        ref={contRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          left: '-9999px',
          width: '524px',
          height: '762px',
        }}
      ></div>
    </>
  );
};

export default PrintPlugin;
