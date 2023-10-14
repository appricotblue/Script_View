import { Outlet, useLocation } from 'react-router-dom';

import Header from '@common/header';
// import PreLoader from '@common/preLoader';

function App() {
  const { pathname } = useLocation();

  // checking if header should be included
  const shouldIncludeHeader = pathname !== '/login' && pathname !== '/signup';

  return (
    <>
      {/* <PreLoader /> */}
      {/* Include header only when it is required */}
      <div id="main">
        {shouldIncludeHeader && <Header />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
