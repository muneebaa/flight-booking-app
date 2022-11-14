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

      if (response.status === 201) {
        setUserToLocalStorage(response.data.user);
        dispatch(
          showAlert({
            message: 'Login Successful',
            type: 'success',
          })
        );
        return response.user;
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
      }
    });

    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
      }
    });
  },
});

export default authSlice.reducer;
