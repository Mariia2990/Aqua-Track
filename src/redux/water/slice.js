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
  waterInfoMonthly: [],
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
      .addCase(fetchWaterDataDaily.fulfilled, (state, action) => {
        state.waterInfo = action.payload.data;
      })
      .addCase(fetchWaterDataMonthly.fulfilled, (state, action) => {
        state.waterInfoMonthly = action.payload.data;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterInfo.push(action.payload.data);
      })
      // Check this one later
      .addCase(updateWater.fulfilled, (state, action) => {
        let water = state.waterInfo.find(
          (item) => item._id === action.payload.data._id,
        );
        water.volume = action.payload.data.volume;
        water.date = action.payload.data.date;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterInfo = state.waterInfo.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

// check selector here

export const { setDate } = slice.actions;

export const waterReducer = slice.reducer;
