import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.create({
  baseURL: 'https://aquatrack-1v64.onrender.com/',
});

const getAuthHeaders = (getState) => {
  const token = getState().auth.token || localStorage.getItem('token');
  if (!token) throw new Error('User is not authenticated');
  return { Authorization: `Bearer ${token}` };
};

export const fetchWaterDataDaily = createAsyncThunk(
  'water/fetchAllDaily',
  async (selectedDate, thunkAPI) => {
    try {
      const response = await axios.get(`/water/daily?day=${selectedDate}`, {
        headers: getAuthHeaders(thunkAPI.getState),
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const fetchWaterDataMonthly = createAsyncThunk(
  'water/fetchAllMonthly',
  async (month, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.get(`/water/monthly?month=${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await axios.post('/water', body, {
        headers: getAuthHeaders(thunkAPI.getState),
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ id, formattedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${id}`, formattedData, {
        headers: getAuthHeaders(thunkAPI.getState),
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${_id}`, {
        headers: getAuthHeaders(thunkAPI.getState),
      });
      return _id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);
