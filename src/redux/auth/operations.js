import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const baseURL = axios.create({
  baseURL: "https://your-api.com/api",
});

const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await baseURL.post("/signup", credentials);
      setAuthHeader(response.data.token);
      toast.success("Successfully registered!");
      return response.data;
    } catch (e) {
      toast.error("Try again...");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await baseURL.post("/login", credentials);
      setAuthHeader(response.data.token);
      toast.success("Successfully logged in!");
      return response.data;
    } catch (e) {
      toast.error("Try again...");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    const response = await baseURL.post("/logout");
    clearAuthHeader();
    toast.success("Goodbye!");
    return response.data;
  } catch (e) {
    toast.error("Try again...");
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await baseURL.get("/current");
      return response.data;
    } catch (e) {
      toast.error("Try again...");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Новый thunk для получения списка всех юзеров
export const fetchUsers = createAsyncThunk(
  "/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await baseURL.get("/users");
      return response.data;
    } catch (e) {
      toast.error("Failed to fetch users");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);