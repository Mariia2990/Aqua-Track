import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWaterDataDaily = createAsyncThunk(
  'water/fetchAllDaily',
  async (selectedDate, thunkAPI) => {
    try {
      const response = await axios.get(`/water/daily?day=${selectedDate}`);
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
    try {
      const response = axios.post('/water', body);

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
