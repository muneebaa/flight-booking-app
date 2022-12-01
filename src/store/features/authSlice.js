import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../global/config/api';
import { setUserToLocalStorage } from '../../global/utils/localStorage';
import axios from 'axios';
import { showAlert } from './alertSlice';

const localStorageUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: localStorageUser ? localStorageUser : {},
};

export const userLogin = createAsyncThunk(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.post('/auth/login/', data, {
        mode: 'cors',
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // response.headers.add('Access-Control-Allow-Origin', '*');

      if (response.status === 200) {
        setUserToLocalStorage(response.data.user);
        dispatch(
          showAlert({
            message: 'Login Successful',
            type: 'success',
          })
        );
        return response.data;
      }
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data.msg,
          type: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const userRegister = createAsyncThunk(
  'auth/register',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.post('/auth/register/', data, {
        credentials: 'include',
        withCredentials: true,
      });

      console.log(data);

      if (response.status === 201) {
        setUserToLocalStorage(response.data.user);
        dispatch(
          showAlert({
            message: 'Signup Successful',
            type: 'success',
          })
        );
        return response.data;
      }
    } catch (error) {
      dispatch(
        showAlert({
          message: error.response.data.msg,
          type: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      API.post('/auth/logout/');

      dispatch(
        showAlert({ message: 'Logged Out Successfully', type: 'success' })
      );
      return true;
    } catch (error) {
      console.log(error.response);
      dispatch(
        showAlert({ message: 'Error while Logging Out!', type: 'error' })
      );
      return false;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = {};
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
      }
    });

    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
        console.log('hieub in the        auth');
      }
    });

    builder.addCase(logOutUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = {};
        localStorage.removeItem('user');
      }
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
