import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import '@babel/polyfill';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import theme from './theme';
import appRouter from './routes';

/**
 * @ - import src
 * @assets - import assets
 * @pages - import pages
 * @common - import from src/components/common
 * @script - import from src/components/script
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* provide theming */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* router-dom configuration */}
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </React.StrictMode>,
);
