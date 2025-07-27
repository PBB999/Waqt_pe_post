import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import parcelReducer from './parcel/parcelSlice';
import addressReducer from './address/addressSlice';
import postmanReducer from './postman/postmanSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        parcel: parcelReducer,
        address: addressReducer,
        postman: postmanReducer,
    },
})