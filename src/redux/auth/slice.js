import { createSlice } from '@reduxjs/toolkit';
import { login, logOut, refreshUser, register, updateUser } from './operations';

const initialState = {
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
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isLoggedIn = true;
        // setAuthHeader(action.payload.accessToken);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        // localStorage.removeItem('refreshToken');
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.token = null;
        localStorage.removeItem('refreshToken');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = slice.reducer;
