import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  getCurrentUser,
  logOut,
  refreshAccessToken,
  register,
  updateUser,
  uploadUserAvatar,
} from './operations';
const initialState = {
  user: {
    _id: null,
    email: null,
    name: null,
    gender: null,
    avatar: null,
    weight: null,
    DailyActivityTime: null,
    DailyWaterNorm: null,
  },
  token: null,
  refreshToken: null,
  sessionId: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.sessionId = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sessionId = action.payload.sessionId;
        state.isLoggedIn = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isRefreshing = false;
        state.token = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(uploadUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadUserAvatar.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setToken } = slice.actions;
export const authReducer = slice.reducer;
