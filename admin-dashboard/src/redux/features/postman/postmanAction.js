import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = `${import.meta.env.VITE_API_ENDPOINT}/api`;

export const registerPostman = createAsyncThunk(
    'postman/register',
    async (postmanData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, postmanData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginPostman = createAsyncThunk(
    'postman/login',
    async ({ postmanId, phone }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { postmanId, phone });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchPostmanById = createAsyncThunk(
    'postman/fetchById',
    async (postmanId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${postmanId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePostman = createAsyncThunk(
    'postman/update',
    async ({ postmanId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${postmanId}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePostman = createAsyncThunk(
    'postman/delete',
    async (postmanId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_BASE_URL}/${postmanId}`);
            return postmanId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const saveParcelAssignments = createAsyncThunk(
    'postman/saveParcelAssignments',
    async ({ postmanId, assignments }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/postman/${postmanId}/parcels`,
                { parcels: assignments }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'An error occurred while saving parcel assignments');
        }
    }
);