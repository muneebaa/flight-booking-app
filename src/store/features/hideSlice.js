import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hide: false,
};

export const hideHeadFoot = createSlice({
  name: 'hide',
  initialState,
  reducers: {
    hideHeaderFooter: (state, { payload }) => {
      state.hide = payload;
    },
  },
});

export const { hideHeaderFooter } = hideHeadFoot.actions;

export default hideHeadFoot.reducer;
