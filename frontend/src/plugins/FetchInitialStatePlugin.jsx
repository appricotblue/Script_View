import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const FetchInitialStatePlugin = () => {
  const [editor] = useLexicalComposerContext();

  fetch('http://localhost:8080/api/scripts/get-initial')
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        const parsed = editor.parseEditorState(JSON.parse(json.data));
        editor.setEditorState(parsed);
      }
    })
    .catch((err) => console.log('ERROR: ', err));

  return null;
};

export default FetchInitialStatePlugin;
