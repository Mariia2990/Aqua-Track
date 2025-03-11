import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.baseURL = 'https://aqua-track-api.onrender.com/';
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    console.log(credentials);
    try {
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.token);
      toast.success('Successfully registered!');
      return response.data;
    } catch (e) {
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signin', credentials);
      setAuthHeader(response.data.token);
      toast.success('Successfully logged in!');
      return response.data;
    } catch (e) {
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
export const logOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    clearAuthHeader();
    toast.success('Goodbye!');
    return response.data;
  } catch (e) {
    toast.error('Try again...');
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (data, thunkAPI) => {
    try {
      const res = await axios.put('/users/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
