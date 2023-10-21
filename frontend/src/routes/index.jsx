import { createBrowserRouter } from 'react-router-dom';

import { Header } from '@common';
import { EditDocument, Home, Login, Signup } from '@pages';
import { ScriptHeader } from '@script';

import App from '@/App';

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
          <>
            <ScriptHeader />
            <EditDocument />
          </>
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
