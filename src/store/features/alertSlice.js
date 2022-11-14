import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlert: false,
  alertMessage: '',
  alertType: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, { payload }) => {
      state.showAlert = true;
      state.alertMessage = payload.message;
      state.alertType = payload.type;
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.alertMessage = '';
      state.alertType = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
