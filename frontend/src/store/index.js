import { configureStore } from '@reduxjs/toolkit';

import scriptSlice from './slices/scriptSlice';

const store = configureStore({
  reducer: { scripts: scriptSlice },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
