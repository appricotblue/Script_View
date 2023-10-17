import { Outlet } from 'react-router-dom';

import { PreLoader } from '@common';

function App() {
  return (
    <>
      <PreLoader />
      <div id="main" style={{ opacity: '0' }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
