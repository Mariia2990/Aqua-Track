// slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  fetchWaterDataDaily,
  fetchWaterDataMonthly,
  updateWater,
} from './operations';

const initialState = {
  monthlyWaterInfo: [],
  dailyWaterInfo: [],
  selectedDate: new Date().toISOString(),
};

const slice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterDataMonthly.fulfilled, (state, action) => {
        state.monthlyWaterInfo = action.payload.data;
      })
      .addCase(fetchWaterDataDaily.fulfilled, (state, action) => {
        state.dailyWaterInfo = action.payload.data;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.monthlyWaterInfo.push(action.payload);
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        const index = state.monthlyWaterInfo.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.monthlyWaterInfo[index] = action.payload.waterInfo;
        }
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.monthlyWaterInfo = state.monthlyWaterInfo.filter(
          (item) => item._id !== action.payload,
        );
        state.dailyWaterInfo = state.dailyWaterInfo.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export const { setDate } = slice.actions;
export const waterReducer = slice.reducer;
