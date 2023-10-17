import { Outlet } from 'react-router-dom';

// import { PreLoader } from '@common';

function App() {
  return (
    <>
      {/* <PreLoader /> */}
      {/* set opacity of main to 0 when using preloader */}
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}

export default App;
