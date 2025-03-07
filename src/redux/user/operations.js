import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfo, setAvatar, setLoading, setError } from "./slice";

// Базовый URL сервера (замените на ваш)
axios.defaults.baseURL = "https://your-api.com/api";

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true)); 
    const response = await axios.get("/user");
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message)); 
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(setLoading(false)); 
  }
});


export const updateUser = createAsyncThunk("user/updateUser", async (userData, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await axios.patch("/user", userData);
    thunkAPI.dispatch(setUserInfo(response.data)); 
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message));
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});


export const updateAvatar = createAsyncThunk("user/updateAvatar", async (avatarFile, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await axios.patch("/user/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    thunkAPI.dispatch(setAvatar(response.data.avatarURL)); 
    return response.data.avatarURL;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message));
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});
