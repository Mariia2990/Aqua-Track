import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser, updateAvatar } from "./operations";
import avatarDefault from "../../assets/img/avatar-default.svg";

const initialState = {
  userInfo: {
    name: "user",
    email: "",
    gender: "women",
    dailyNorm: 1.5,
    weight: 0,
    activeSportTime: 0,
  },
  avatarURL: avatarDefault,
  monthData: [],
  todayWaterList: [],
  waterList: [],
  isLoading: false,
  isErrorMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatarURL = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.avatarURL = action.payload;
      });
  },
});

export const { setUserInfo, setAvatar, setLoading, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
