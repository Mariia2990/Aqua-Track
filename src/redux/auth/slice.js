import { createSlice } from '@reduxjs/toolkit';
import { login, logOut, refreshUser, register, updateUser } from './operations';

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      name: null,
      gender: null,
      avatar: null,
      weight: null,
      DailyActivityTime: null,
      DailyWaterNorm: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null, 
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null; 
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true; 
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          email: null,
          name: null,
          gender: null,
          avatar: null,
          weight: null,
          DailyActivityTime: null,
          DailyWaterNorm: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = '';
        state.isRefreshing = false;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.user.gender = action.payload.gender;
        state.user.avatar = action.payload.avatarUrl;
        state.user.weight = action.payload.weight;
        state.user.DailyActivityTime = action.payload.DailyActivityTime;
        state.user.DailyWaterNorm = action.payload.DailyWaterNorm;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = slice.reducer;

