import { createSlice } from '@reduxjs/toolkit';
import { createParcel, getParcelById, updateParcel, deleteParcel, addTrackingHistory, updateParcelStatus, addFeedback, getUserByMobileNumber, getTodaysDeliveriesByPostmanId, getParcelBySenderId, getParcelByReceiverId } from './parcelActions';

const initialState = {
    parcels: [],
    senderParcels: null,
    receiverParcels: null,
    currentParcel: null,
    parcelsToday: null,
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
            state.creatingParcel = {...state.creatingParcel, ...action.payload};
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
                state.currentParcel = action.payload;
            })
            .addCase(getParcelById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getParcelBySenderId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParcelBySenderId.fulfilled, (state, action) => {
                state.loading = false;
                state.senderParcels = action.payload;
            })
            .addCase(getParcelBySenderId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getParcelByReceiverId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getParcelByReceiverId.fulfilled, (state, action) => {
                state.loading = false;
                state.receiverParcels = action.payload;
            })
            .addCase(getParcelByReceiverId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTodaysDeliveriesByPostmanId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTodaysDeliveriesByPostmanId.fulfilled, (state, action) => {
                state.loading = false;
                state.parcelsToday = action.payload;
            })
            .addCase(getTodaysDeliveriesByPostmanId.rejected, (state, action) => {
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
            })
            .addCase(getUserByMobileNumber.rejected, (state, action) => {
                state.loading = false;
                state.creatingParcel = { ...state.creatingParcel, receiverId: null };
                state.error = action.error.message;
            });
    },
});

export const { updateCreatingParcel } = parcelSlice.actions;

export default parcelSlice.reducer;
