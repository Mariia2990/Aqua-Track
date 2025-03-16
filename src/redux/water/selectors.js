// selectors.js
export const selectMonthlyWater = (state) => state.water.monthlyWaterInfo;
export const selectDailyWater = (state) => state.water.dailyWaterInfo;
export const selectDate = (state) => state.water.selectedDate;

export const selectYearMonth = (state) => {
  const date = new Date(state.water.selectedDate);
  return { year: date.getFullYear(), month: date.getMonth() };
};
