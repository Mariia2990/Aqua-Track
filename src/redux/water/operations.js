import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const aquaTrackApi = axios.create({
  baseURL: 'https://aquatrack-1v64.onrender.com',
});

export const fetchWaterDataDaily = createAsyncThunk(
  'water/fetchAllDaily',
  async (_, thunkAPI) => {
    try {
      const response = await aquaTrackApi.get('/water/daily');
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
      const response = await aquaTrackApi.get('/water/monthly');
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
      const response = await aquaTrackApi.post(`/water/${body.id}`, body);
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
      const response = await aquaTrackApi.delete(`/water/${body.id}`, body);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
