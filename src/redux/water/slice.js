import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  fetchWaterDataDaily,
  fetchWaterDataMonthly,
  updateWater,
} from './operations';

const initialState = {
  waterInfo: [],
  selectedDate: new Date().toISOString(),
  
//   waterInfo: [
//     { id: '1', volume: '1', date: '2:10' },
//     { id: '2', volume: '3', date: '4:20' },
//   ],

//   selectedDate: new Date(
//     new Date().getFullYear(),
//     new Date().getMonth(),
//     1,
//   ).toISOString(),
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
      .addCase(fetchWaterDataDaily.fulfilled, (state, action) => {
        state.waterInfo = action.payload.data;
      })
      .addCase(fetchWaterDataMonthly.fulfilled, (state, action) => {
        state.waterInfo = action.payload.data;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterInfo.push(action.payload);
      })
      // Check this one later
      .addCase(updateWater.fulfilled, (state, action) => {
        let water = state.waterInfo.find(
          (item) => item._id === action.payload._id,
        );
        water.volume = action.payload.waterInfo.volume;
        water.date = action.payload.waterInfo.date;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterInfo = state.waterInfo.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

// check selector here

export const { setDate } = slice.actions;

export const waterReducer = slice.reducer;
