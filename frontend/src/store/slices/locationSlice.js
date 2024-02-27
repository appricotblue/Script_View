import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: { location: [] },
  reducers: {
    setLocation: (state, { payload }) => {
      return { ...state, location: payload };
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;