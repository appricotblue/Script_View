import { createSlice } from '@reduxjs/toolkit';

const scriptSlice = createSlice({
  name: 'scripts',
  initialState: { socket: null },
  reducers: {
    setSocket: (state, { payload }) => {
      return { ...state, socket: payload.socket };
    },
  },
});

export const { setSocket } = scriptSlice.actions;
export default scriptSlice.reducer;
