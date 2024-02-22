import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import { useEffect } from 'react';

export const SEARCH_BY_WORD = createCommand();

function SearchByWordPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterCommand = editor.registerCommand(
      SEARCH_BY_WORD,
      (searchTerm) => {
        const root = editor.getRoot();
        const textNodes = root.getTexts();
        
        const matchingNodes = textNodes.filter(node =>
          node.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchingNodes.length > 0) {
          // You can handle the matching nodes as needed
          console.log('Matching nodes:', matchingNodes);
        } else {
          console.log('No matching nodes found.');
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      unregisterCommand();
    };
  }, [editor]);

  return null;
}

export default SearchByWordPlugin;
