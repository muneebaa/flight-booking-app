import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
import loadingReducer from './features/loadingSlice';
import alertReducer from './features/alertSlice';
import bookFlight from './features/bookFlight';
import hideHeadFoot from './features/hideSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    alert: alertReducer,
    book: bookFlight,
    hide: hideHeadFoot,
  },
});
