import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import useSocketRegistration from '@/utils/hooks/useSocketRegistration';
import { useDebounce } from '@hooks';
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
