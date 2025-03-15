import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://aquatrackerapi.onrender.com';
export const getUsers = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/users');
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
