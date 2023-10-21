import { Stack } from '@mui/material';

import { ScriptSidebar, TextEditor } from '@script';

const EditDocument = () => {
  return (
    <Stack display="flex" direction="row" width="100%" mt="2rem">
      <ScriptSidebar />
      <TextEditor />
    </Stack>
  );
};

export default EditDocument;
