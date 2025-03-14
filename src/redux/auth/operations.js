import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://aqua-track-api.onrender.com/';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// axios.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');

//       if (refreshToken) {
//         try {
//           const res = await axios.post('/users/refresh', { refreshToken });

//           setAuthHeader(res.data.accessToken);
//           localStorage.setItem('refreshToken', res.data.refreshToken);
//           originalRequest.headers.Authorization = `Bearer ${ res.data.accessToken }`;

//           return axios(originalRequest);
//         } catch (refreshError) {
//           localStorage.removeItem('refreshToken');
//           clearAuthHeader();
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(err);
//   },
// );

export const register = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.accessToken);
      // localStorage.setItem('refreshToken', response.data.refreshToken);
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
      // localStorage.setItem('refreshToken', response.data.refreshToken);
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
    // localStorage.removeItem('refreshToken');
    toast.success('Goodbye!');
    return {};
  } catch (e) {
    toast.error('Try again...');
    return thunkAPI.rejectWithValue(e.message);
  }
});

// export const refreshUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!refreshToken) {
//       return thunkAPI.rejectWithValue('No refresh token available');
//     }

//     try {
//       const response = await axios.post('/users/refresh', { refreshToken });
//       setAuthHeader(response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       return response.data;
//     } catch (e) {
//       localStorage.removeItem('refreshToken');
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   },
// );

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    const { refreshToken, sessionId } = thunkAPI.getState().auth;
    try {
      const response = await aqua.post('users/refresh', {
        refreshToken,
        sessionId,
      });
      const { data } = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Помилка оновлення токену',
      );
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