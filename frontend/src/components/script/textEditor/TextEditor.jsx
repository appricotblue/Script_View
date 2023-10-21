import { Stack } from '@mui/material';

import TextArea from '@script/textArea/TextArea';

const TextEditor = () => {
  return (
    <Stack
      direction="row"
      maxHeight="calc(100vh - 4.5rem)"
      sx={{ overflowY: 'auto', flexGrow: 1, justifyContent: 'center', py: '1.2rem' }}
    >
      <TextArea />
    </Stack>
  );
};

export default TextEditor;
