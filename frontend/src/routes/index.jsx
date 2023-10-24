import { createBrowserRouter } from 'react-router-dom';

import { Header, WithHeaderMargin } from '@common';
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
            <WithHeaderMargin>
              <Home />
            </WithHeaderMargin>
          </>
        ),
      },
      {
        path: '/document/:id',
        element: (
          <>
            <ScriptHeader />
            <WithHeaderMargin>
              <EditDocument />
            </WithHeaderMargin>
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
