import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/login';
import Home from '@pages/home';
import Signup from '@pages/signup';

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
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default appRouter;
