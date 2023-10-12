import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/login';
import Home from '@pages/home';

import App from '../App';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default appRouter;
