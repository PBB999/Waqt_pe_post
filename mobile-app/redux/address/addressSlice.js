import { createSlice } from '@reduxjs/toolkit';
import { fetchAddressesByUser, createAddress, updateAddress, deleteAddress } from './addressActions';

const initialState = {
    addresses: null,
    pickupAddress: null,
    deliveryAddress: null,
    status: 'idle',
    error: null,
    loading: false,
    success: false,
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setPickupAddress: (state, action) => {
            state.pickupAddress = action.payload;
        },
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        resetSuccess: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddressesByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddressesByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.addresses = action.payload;
            })
            .addCase(fetchAddressesByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createAddress.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.status = 'loading';
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
                state.success = true;
                console.log('Address created successfully');
                state.loading = false;
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.success = false;
                state.loading = false;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                const index = state.addresses.findIndex((addr) => addr.id === action.payload.id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
            });
    },
});

export const { setPickupAddress, setDeliveryAddress,
    resetSuccess } = addressSlice.actions;

export default addressSlice.reducer;
