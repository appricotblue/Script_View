import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Header, PreLoader } from '@common';
import { Home, Login } from '@pages';
import { ScriptHeader } from '@script';

import App from '@/App';

const Signup = lazy(() => import('@pages/signup'));
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
        element: (
          <Suspense fallback={<PreLoader />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
]);

export default appRouter;
