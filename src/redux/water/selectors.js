export const selectWaterVolume = (state) => state.water.waterInfo.volume;
export const selectWaterDate = (state) => state.water.waterInfo.date;
export const selectWater = (state) => state.water.waterInfo;
export const selectWaterMonthly = (state) => state.water.waterInfoMonthly;

export const selectDate = (state) => state.water.selectedDate;

export const selectYearMonth = (state) => {
  const date = new Date(state.water.selectedDate);
  return { year: date.getFullYear(), month: date.getMonth() };
};
