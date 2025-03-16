import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.create({
  baseURL: 'https://aquatrackerapi.onrender.com',
});

export const fetchWaterDataDaily = createAsyncThunk(
  'water/fetchAllDaily',
  async (selectedDate, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.get(`/water/daily?day=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const fetchWaterDataMonthly = createAsyncThunk(
  'water/fetchAllMonthly',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/water/monthly');
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (body, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const response = await axios.post('/water', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async (body, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${body.id}`, body);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (body, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${body.id}`, body);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
