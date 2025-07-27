import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password, phone }) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/register`, { name, email, password, phone });
        return response.data.data.user;
    } catch (error) {
        console.error('Error registering user:', error);
        return rejectWithValue(error.response?.data || { message: 'Error registering user' });
        
    }
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
    try {
        const response = await axios.post(`${apiUrl}/api/user/login`, { email, password });
        const user = response.data.data.user;
        const userToken = user.userToken;
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        return user;
    } catch (error) {
        console.log("Error logging user:", error);
        return rejectWithValue(error.response?.data || { message: 'Error registering user' });
    }
});

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${apiUrl}/api/user/${id}`, updatedData);
            return response.data.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Error updating user' });
        }
    }
);