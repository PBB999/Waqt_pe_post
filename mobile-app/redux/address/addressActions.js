import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL + '/api/address';

export const fetchAddressesByUser = createAsyncThunk(
    'address/fetchAddressesByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching addresses", error);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
        }
    }
);

export const createAddress = createAsyncThunk(
    'address/createAddress',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/create`, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating address", error);
            return rejectWithValue(error.response?.data?.message || 'Failed to create address');
        }
    }
);

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async ({ addressId, updates }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/${addressId}`, updates, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating address", error);
            return rejectWithValue(error.response?.data?.message || 'Failed to update address');
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiUrl}/${addressId}`);
            return addressId;
        } catch (error) {
            console.error("Error deleting address", error);
            return rejectWithValue(error.response?.data?.message || 'Failed to delete address');
        }
    }
);
