import { createSlice } from '@reduxjs/toolkit';
import { createParcel, getParcelById, updateParcel, deleteParcel, addTrackingHistory, updateParcelStatus, addFeedback, getUserByMobileNumber, getParcelByPin } from './parcelActions';

const initialState = {
    parcels: [],
    loading: false,
    error: null,
    creatingParcel: {
        senderId: null,
        receiverId: null,
        pickupAddress: null,
        deliveryAddress: null,
        status: "Created",
        timeSlot: {
            startTime: null,
            endTime: null,
        },
        otp: null,
        packageDetails: {
            selectedPackage: null,
            customPackage: null,
            selectedSize: null,
            dimensions: {
                length: null,
                breadth: null,
                height: null,
            },
            weight: null,
            selectedContent: null,
            customContent: null,
        },
        deliveryType: null,
        price: null,
    }
};

const parcelSlice = createSlice({
    name: 'parcel',
    initialState,
    reducers: {
        updateCreatingParcel: (state, action) => {
            state.creatingParcel = { ...state.creatingParcel, ...action.payload };
            console.log("state.creatingParcel", state.creatingParcel);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createParcel.pending, (state) => {
                state.loading = true;
            })
            .addCase(createParcel.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels.push(action.payload);
            })
            .addCase(createParcel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getParcelById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParcelById.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.map((parcel) =>
                    parcel.parcelId === action.payload.parcelId ? action.payload : parcel
                );
            })
            .addCase(getParcelById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getParcelByPin.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParcelByPin.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = action.payload;
            })
            .addCase(getParcelByPin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateParcel.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateParcel.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.map((parcel) =>
                    parcel.parcelId === action.payload.parcelId ? action.payload : parcel
                );
            })
            .addCase(updateParcel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteParcel.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteParcel.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.filter((parcel) => parcel.parcelId !== action.payload);
            })
            .addCase(deleteParcel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTrackingHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTrackingHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.map((parcel) =>
                    parcel.parcelId === action.payload.parcelId ? action.payload : parcel
                );
            })
            .addCase(addTrackingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateParcelStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateParcelStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.map((parcel) =>
                    parcel.parcelId === action.payload.parcelId ? action.payload : parcel
                );
            })
            .addCase(updateParcelStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = state.parcels.map((parcel) =>
                    parcel.parcelId === action.payload.parcelId ? action.payload : parcel
                );
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getUserByMobileNumber.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserByMobileNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.creatingParcel = { ...state.creatingParcel, receiverId: action.payload };
                console.log("state.creatingParcel", state.creatingParcel);
            })
            .addCase(getUserByMobileNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { updateCreatingParcel } = parcelSlice.actions;

export default parcelSlice.reducer;
