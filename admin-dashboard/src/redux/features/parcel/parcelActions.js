import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

export const createParcel = createAsyncThunk('/parcel/create', async (parcelData) => {
    try {
        parcelData = { ...parcelData, status: "Created", pickupAddress: parcelData.pickupAddress._id, deliveryAddress: parcelData.deliveryAddress._id, receiverId: parcelData.receiverId._id }
        const response = await axios.post(`${apiUrl}/api/parcel/create`, parcelData);
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
});

export const getParcelById = createAsyncThunk('parcel/getParcelById', async (parcelId) => {
    const response = await axios.get(`${apiUrl}/parcel/${parcelId}`);
    return response.data;
});
export const getParcelBySenderId = createAsyncThunk('parcel/getParcelBySenderId', async (senderId) => {
    const response = await axios.get(`${apiUrl}/api/parcel/sender/${senderId}`);
    return response.data;
});

export const getParcelByPin = createAsyncThunk('parcel/getParcelByPin', async (pinCode) => {
    const response = await axios.get(`${apiUrl}/api/parcel/pin/${pinCode}`);
    console.log("called this function")
    console.log("response", response)
    return response.data.data.parcels;
});

export const updateParcel = createAsyncThunk('parcel/updateParcel', async ({ parcelId, parcelData }) => {
    const response = await axios.put(`${apiUrl}/parcel/${parcelId}`, parcelData);
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

export const getUserByMobileNumber = createAsyncThunk('parcel/getUserByMobileNumber', async (number) => {
    try {
        console.log("redux number", number)
        const response = await axios.get(`${apiUrl}/api/user/getUserByMobileNumber/${number}`);
        const user = response.data;
        console.log("user", user)
        return response.data;
    } catch (error) {
        console.log("Error getting user:", error);
        return rejectWithValue(error.response?.data || { message: 'Error getting user' });
    }
});