import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Header, PreLoader } from '@common';
import { Home, Login, Signup } from '@pages';
import { ScriptHeader } from '@script';

import App from '@/App';

const EditDocument = lazy(() => import('@pages/editDocument'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <Home />
          </>
        ),
      },
      {
        path: '/document/:id',
        element: (
          <Suspense fallback={<PreLoader />}>
            <ScriptHeader />
            <EditDocument />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default appRouter;
