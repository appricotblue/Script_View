import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useParams } from 'react-router-dom';
import { useDebounce } from '@hooks';
import { useContext } from 'react';

import { ScriptSocketContext } from '@/context/ScriptSocketContext';

const AutoSavePlugin = () => {
  const { socket } = useContext(ScriptSocketContext);
  const { id } = useParams();

  const debounceCb = (editorState) => {
    if (socket === null) {
      return console.error('No socket registered');
    }
    socket.emit('save-state', { state: editorState, id });
  };
  const saveDebounce = useDebounce(debounceCb, 500);
  const onChange = (editorState) => {
    saveDebounce(JSON.stringify(editorState.toJSON()));
  };
  return <OnChangePlugin onChange={onChange} ignoreSelectionChange={true} />;
};

export default AutoSavePlugin;
