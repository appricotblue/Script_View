import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@mui/material';
import { $generateHtmlFromNodes } from '@lexical/html';

const PrintPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const handleClick = () => {
    console.log($generateHtmlFromNodes(editor));
  };

  return <Button onClick={handleClick}>Print</Button>;
};

export default PrintPlugin;
