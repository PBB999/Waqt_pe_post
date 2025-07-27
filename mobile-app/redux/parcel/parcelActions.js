import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const createParcel = createAsyncThunk('/parcel/create', async (parcelData) => {
    try {
        parcelData = { ...parcelData, status: "Created", pickupAddress: parcelData.pickupAddress._id, deliveryAddress: parcelData.deliveryAddress._id, receiverId: parcelData.receiverId._id }
        const response = await axios.post(`${apiUrl}/api/parcel/create`, parcelData);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
});

export const updateParcelScheduleAndAddress = createAsyncThunk(
    '/parcel/updateScheduleAndAddress',
    async ({ parcelId, timeSlot, pickupAddress, deliveryAddress }) => {
        try {
            const updates = {
                ...(timeSlot && { timeSlot }),
                ...(pickupAddress && { pickupAddress }), 
                ...(deliveryAddress && { deliveryAddress }), 
            };
            const response = await axios.put(`${apiUrl}/api/parcel/${parcelId}`, updates);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Failed to update parcel schedule and address');
        }
    }
);


export const getParcelById = createAsyncThunk('parcel/getParcelById', async (parcelId) => {
    const response = await axios.get(`${apiUrl}/api/parcel/${parcelId}`);
    return response.data.data.parcel;
});

export const getParcelBySenderId = createAsyncThunk('parcel/getParcelBySenderId', async (senderId) => {
    const response = await axios.get(`${apiUrl}/api/parcel/sender/${senderId}`);
    return response.data.data.parcel;
});

export const getParcelByReceiverId = createAsyncThunk('parcel/getParcelByReceiverId', async (receiverId) => {
    const response = await axios.get(`${apiUrl}/api/parcel/receiver/${receiverId}`);
    return response.data.data.parcel;
});

export const updateParcel = createAsyncThunk('parcel/updateParcel', async ({ parcelId, parcelData }) => {
    const response = await axios.put(`${apiUrl}/api/parcel/${parcelId}`, parcelData);
    return response.data;
});

export const deleteParcel = createAsyncThunk('parcel/deleteParcel', async (parcelId) => {
    await axios.delete(`${apiUrl}/parcel/${parcelId}`);
    return parcelId;
});

export const addTrackingHistory = createAsyncThunk('parcel/addTrackingHistory', async ({ parcelId, trackingData }) => {
    const response = await axios.post(`${apiUrl}/parcel/${parcelId}/tracking`, trackingData);
    return response.data;
});

export const updateParcelStatus = createAsyncThunk('parcel/updateParcelStatus', async ({ parcelId, status }) => {
    const response = await axios.put(`${apiUrl}/parcel/${parcelId}/status`, { status });
    return response.data;
});

export const addFeedback = createAsyncThunk('parcel/addFeedback', async ({ parcelId, feedback }) => {
    const response = await axios.put(`${apiUrl}/parcel/${parcelId}/feedback`, feedback);
    return response.data;
});

export const getTodaysDeliveriesByPostmanId = createAsyncThunk('parcel/getTodaysDeliveriesByPostmanId', async (postmanId) => {
    const response = await axios.get(`${apiUrl}/api/parcel/postman/${postmanId}/today`);
    return response.data.data.parcels;
});

export const getUserByMobileNumber = createAsyncThunk('parcel/getUserByMobileNumber', async (number) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/getUserByMobileNumber/${number}`);
        return response.data;
    } catch (error) {
        console.log("Error getting user:", error);
        return rejectWithValue(error.response?.data || { message: 'Error getting user' });
    }
});