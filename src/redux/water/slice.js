import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  fetchWaterDataDaily,
  fetchWaterDataMonthly,
  updateWater,
} from './operations';

const initialState = {
  waterInfo: [
    { id: '1', volume: '1', date: '2:10' },
    { id: '2', volume: '3', date: '4:20' },
  ],
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
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterInfo.push(action.payload);
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
