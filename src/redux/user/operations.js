import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'урл апі бекенду';
export const getUsers = createAsyncThunk(
    'users/get',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('роут з бекенду');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)