import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';

import css from '@/pages/editDocument/Editor.css?inline';
export const PRINT_COMMAND = createCommand('print-command');

const PrintPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { id } = useParams();

  useEffect(() => {
    return editor.registerCommand(
      PRINT_COMMAND,
      () => {
        editor.update(() => {
          // convert editor state into html
          const htmlString = $generateHtmlFromNodes(editor, null);
          fetch('http://localhost:8080/api/scripts/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ css, html: htmlString, format: 'pdf' }),
          })
            .then((response) => {
              if (response.ok) {
                return response.blob();
              } else {
                throw new Error('Request Failed');
              }
            })
            .then((pdfBlob) => {
              const pdfUrl = URL.createObjectURL(pdfBlob);
              const downloadLink = document.createElement('a');
              downloadLink.href = pdfUrl;
              downloadLink.download = 'untitled document.pdf';

              downloadLink.click();

              URL.revokeObjectURL(pdfUrl);
            })
            .catch((err) => console.error('ERROR: ', err));
        });
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, id]);
  return null;
};

export default PrintPlugin;
