import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refreshUser, register } from "./operations";

const slice = createSlice({
  name: "auth",

    initialState: {
        user: {
            name: null,
            email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
        users: {
            list: [],
            total: 0,
            avatars: [],
        },
    },

  extraReducers: (builder) => {
      builder
          .addCase(register.fulfilled, (state, action) => {
              state.user = action.payload.user;
              state.token = action.payload.token;
              state.isLoggedIn = true;
          })
          .addCase(login.fulfilled, (state, action) => {
              state.user = action.payload.user;
              state.token = action.payload.token;
              state.isLoggedIn = true;
          })
          .addCase(logOut.fulfilled, (state) => {
              state.user = { name: null, email: null };
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
          .addCase(fetchUsers.fulfilled, (state, action) => {
              state.users.list = action.payload;
              state.users.total = action.payload.length;
              state.users.avatars = action.payload.map(user => user.avatarURL);
          });
  },
});

export const authReducer = slice.reducer;