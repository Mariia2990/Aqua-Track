export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUsers = (state) => state.auth.users.list;
export const selectUsersTotal = (state) => state.auth.users.total;
export const selectUsersAvatars = (state) => state.auth.users.avatars;