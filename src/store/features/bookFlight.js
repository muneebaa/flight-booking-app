import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookFlight: {},
};

export const bookFlight = createSlice({
  name: 'bookFlight',
  initialState,
  reducers: {
    createBookFlight: (state, { payload }) => {
      state.bookFlight = payload;
    },
  },
});

export const { createBookFlight } = bookFlight.actions;

export default bookFlight.reducer;
