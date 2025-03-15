import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://aquatrackerapi.onrender.com/';

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
      console.log(response);
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
    console.log(credentials);
    try {
      const response = await axios.post('/users/signin', credentials);
      console.log(response);
      setAuthHeader(response.data.accessToken);
      toast.success('Successfully logged in!');
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error('Try again...');
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sessionId');
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
    console.log(refreshToken);
    console.log(sessionId);

    try {
      const responseData = await axios.post('/users/refresh', {
        refreshToken,
        sessionId,
      });
      console.log(responseData);
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
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (data, thunkAPI) => {
    try {
      const res = await axios.put('/users/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const uploadUserAvatar = createAsyncThunk(
  'auth/uploadUserAvatar',
  async (data, thunkAPI) => {
    try {
      const res = await axios.put('/users/avatar', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
