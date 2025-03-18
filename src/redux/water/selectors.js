import { createSelector } from 'reselect';

export const selectWaterVolume = (state) => state.water.waterInfo.volume;
export const selectWaterDate = (state) => state.water.waterInfo.date;
export const selectWater = (state) => state.water.waterInfo;
export const selectWaterMonthly = (state) => state.water.waterInfoMonthly;

export const selectDate = (state) => state.water.selectedDate;

const selectedWater = (state) => state.water;

export const selectYearMonth = createSelector([selectWater], (water) => {
  const date = new Date(water.selectedDate);
  return { year: date.getFullYear(), month: date.getMonth() };
});

// export const selectYearMonth = (state) => {
//   const date = new Date(state.water.selectedDate);
//   return { year: date.getFullYear(), month: date.getMonth() };
// };
