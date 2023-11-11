import { createBrowserRouter } from 'react-router-dom';

import { Header, WithHeaderMargin } from '@common';
import { EditDocument, Home, Login, Signup } from '@pages';
import { ScriptHeader } from '@script';
import App from '@/App';
import LexicalComposerProvider from '@/context/LexicalComposerInitial';

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
          <LexicalComposerProvider>
            <ScriptHeader />
            <WithHeaderMargin>
              <EditDocument />
            </WithHeaderMargin>
          </LexicalComposerProvider>
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
