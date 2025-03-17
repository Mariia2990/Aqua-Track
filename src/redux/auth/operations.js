import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://aquatrack-1v64.onrender.com/';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const setupInterceptors = (dispatch) => {
  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const auth = JSON.parse(localStorage.getItem('auth'));
        const refreshToken = auth?.refreshToken;
        const sessionId = auth?.sessionId;

        if (!refreshToken && !sessionId) {
          dispatch(logOut());
          return Promise.reject(err);
        }
        try {
          const response = await axios.post('/users/refresh', {
            refreshToken,
            sessionId,
          });
          const {
            accessToken,
            refreshToken: newRefreshToken,
            sessionId: newSessionId,
          } = response.data;
          console.log(accessToken);
          setAuthHeader(accessToken);
          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: accessToken,
              refreshToken: newRefreshToken,
              sessionId: newSessionId,
            }),
          );
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          dispatch(
            setAuth({
              accessToken,
              refreshToken: newRefreshToken,
              sessionId: newSessionId,
            }),
          );
          dispatch(
            setUser({
              user,
            }),
          );
          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('auth');
          dispatch(logOut());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(err);
    },
  );
};

export const register = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.accessToken);
      toast.success('Successfully registered!');
      return response.data;
    } catch (e) {
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signin', credentials);
      setAuthHeader(response.data.accessToken);
      toast.success('Successfully logged in!');
      return response.data;
    } catch (e) {
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    toast.success('Goodbye!');
    return {};
  } catch (e) {
    toast.error('Try again...');
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, thunkAPI) => {
    const { refreshToken, sessionId } = thunkAPI.getState().auth;

    try {
      const responseData = await axios.post('/users/refresh', {
        refreshToken,
        sessionId,
      });
      const {
        accessToken,
        refreshToken: newRefreshToken,
        sessionId: newSessionId,
        user,
      } = responseData.data;
      setAuthHeader(accessToken);
      thunkAPI.dispatch(
        setAuth({
          accessToken,
          refreshToken: newRefreshToken,
          sessionId: newSessionId,
        }),
      );
      thunkAPI.dispatch(
        setUser({
          user,
        }),
      );
      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
        sessionId: newSessionId,
        user: user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Помилка оновлення токену',
      );
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.get('/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.patch('/users/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const uploadUserAvatar = createAsyncThunk(
  'auth/uploadUserAvatar',
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await axios.patch('/users/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
