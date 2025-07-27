import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/user/register`, { name, email, password });
    return response.data.data.user;
})

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
    console.log(import.meta.env.VITE_API_ENDPOINT)
    const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/login`, { email, password });
    console.log("Response", response)
    const user = response.data.data.user;
    console.log("response is", response)
    console.log("user is", user)
    const userToken = user.userToken;
    const pincode = user.pinCode;
    console.log(pincode)
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('pinCode', pincode);
    return user;
})

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/user/${id}`, updatedData);
            return response.data.data.user;
        } catch (error) {
            console.error('Error updating user:', error);
            return rejectWithValue(error.response?.data || { message: 'Error updating user' });
        }
    }
);
