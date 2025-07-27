import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import postmanReducer from './features/postman/postmanSlice';
import parcelReducer from './features/parcel/parcelSlice';
import { authApi } from '../services/auth/authService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    postman: postmanReducer,
    parcel: parcelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

export default store;
