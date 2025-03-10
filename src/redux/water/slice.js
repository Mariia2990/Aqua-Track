import { createSlice } from '@reduxjs/toolkit';
import {
  deleteWater,
  fetchWaterDataDaily,
  fetchWaterDataMonthly,
  updateWater,
} from './operations';

const initialState = {
  waterInfo: [{ volume: '', date: '' }],
};

const slice = createSlice({
  name: 'water',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterDataDaily.fulfilled, (state, action) => {
        state.waterInfo = action.payload;
      })
      .addCase(fetchWaterDataMonthly.fulfilled, (state, action) => {
        state.waterInfo = action.payload;
      })
      // Check this one later
      .addCase(updateWater.fulfilled, (state, action) => {
        let water = state.waterInfo.find(
          (item) => item.id === action.payload.id,
        );
        water.volume = action.payload.waterInfo.volume;
        water.date = action.payload.waterInfo.date;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterInfo = state.waterInfo.find(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const waterReducer = slice.reducer;
