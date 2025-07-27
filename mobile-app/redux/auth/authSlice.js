import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateUser } from "./authActions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await AsyncStorage.removeItem('userToken');
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    isLoading: false,
    updateUserLoading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
    msg: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.userInfo = payload.data.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.success = true;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.success = false;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.userToken = action.payload.userToken;
            state.msg = "User loggedin successfully"
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(updateUser.pending, (state) => {
            state.updateUserLoading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            state.userInfo = { ...state.userInfo, ...action.payload };
            state.success = true;
            state.msg = "User updated successfully";
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.updateUserLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
            state.msg = "User logged out successfully";
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;