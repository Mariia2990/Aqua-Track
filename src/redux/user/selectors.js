export const selectUsersCount = (state) => state.users.count;
export const selectUsersAvatars = (state) => state.users.avatars;
export const selectLoading = (state) => state.users.loading;
export const selectUserInfo = (state) => state.user.userInfo;

export const selectDailyNorm = (state) => state.user.userInfo.dailyNorm;

export const selectAvatarURL = (state) => state.user.avatarURL;

export const selectMonthData = (state) => state.user.monthData;

export const selectTodayWaterList = (state) => state.user.todayWaterList;

export const selectWaterList = (state) => state.user.waterList; 


export const selectUserErrorMessage = (state) => state.user.isErrorMessage;
export const selectUserIsLoading = (state) => state.user.isLoading;
