import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useDebounce } from '@hooks';

import useSocketRegistration from '@/utils/hooks/useSocketRegistration';
const AutoSavePlugin = () => {
  const [socket] = useSocketRegistration();

  const debounceCb = (editorState) => {
    if (socket === null) {
      return console.error('No socket registered');
    }
    socket.emit('save-state', { state: editorState });
  };
  const saveDebounce = useDebounce(debounceCb, 500);
  const onChange = (editorState) => {
    saveDebounce(JSON.stringify(editorState.toJSON()));
  };
  return <OnChangePlugin onChange={onChange} ignoreSelectionChange={true} />;
};

export default AutoSavePlugin;