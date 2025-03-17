import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://aquatrack-1v64.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:3000';

export const getUsers = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/users/counter');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
