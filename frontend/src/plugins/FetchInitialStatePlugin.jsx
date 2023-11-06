import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useParams } from 'react-router-dom';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const FetchInitialStatePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { id } = useParams();

  fetch(`${VITE_BASE_URL}/api/scripts/get-initial/${id}`)
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        const data = json.data;
        if (data) {
          const parsed = editor.parseEditorState(JSON.parse(json.data));
          editor.setEditorState(parsed);
        }
      }
    })
    .catch((err) => console.log('ERROR: ', err));

  return null;
};

export default FetchInitialStatePlugin;
