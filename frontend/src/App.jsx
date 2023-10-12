import { Outlet, useLocation } from 'react-router-dom';

import Header from '@common/Header';

function App() {
  const { pathname } = useLocation();

  // checking if header should be included
  const shouldIncludeHeader = pathname !== '/login' && pathname !== '/signup';

  return (
    <>
      {/* Include header only when it is required */}
      {shouldIncludeHeader && <Header />}
      <Outlet />
    </>
  );
}

export default App;
