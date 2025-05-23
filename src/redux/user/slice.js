import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './operations.js';
const initialState = {
  count: null,
  avatars: [],
  error: null,
  loading: false,
};
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, handlePending)
      .addCase(getUsers.fulfilled, (state, action) => {
        state.count = action.payload.usersCount;
        state.avatars = action.payload.lastUsersAvatars;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const usersReducer = usersSlice.reducer;
