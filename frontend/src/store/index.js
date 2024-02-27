import { configureStore } from '@reduxjs/toolkit';

import scriptSlice from './slices/scriptSlice';
import userSlice from './slices/userSlice';
import locationSlice from './slices/locationSlice';

const store = configureStore({
  reducer: { scripts: scriptSlice, user: userSlice, location: locationSlice },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
