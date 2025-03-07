import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    name: "user",
    email: "",
    gender: "women",
    dailyNorm: 1.5,
    weight: 0,
	activeSportTime: 0,
  },
  avatarURL: "/src/img/avatar-default.svg",
  monthData: [],
  todayWaterList: [],
  waterList: [], 
  isLoading: false,
  isErrorMessage: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
  });
  
  export const userReducer = userSlice.reducer;