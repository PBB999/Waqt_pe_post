import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deletePostman, fetchPostmanById, loginPostman, registerPostman, updatePostman } from './postmanAction';
const initialState = {
    postmen: [], 
    userInfo: {},
    userToken: null, 
    postman: null,
    loading: false,
    error: null,
};

const postmanSlice = createSlice({
    name: 'postman',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(registerPostman.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerPostman.fulfilled, (state, action) => {
                state.loading = false;
                state.postman = action.payload;
            })
            .addCase(registerPostman.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginPostman.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(loginPostman.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.userToken = action.payload.userToken;
                state.msg = "User loggedin successfully"
            })
            .addCase(loginPostman.rejected, (state, action) => {
                console.log("Error", action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPostmanById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostmanById.fulfilled, (state, action) => {
                state.loading = false;
                state.postman = action.payload;
            })
            .addCase(fetchPostmanById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePostman.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePostman.fulfilled, (state, action) => {
                state.loading = false;
                state.postman = { ...state.postman, ...action.payload };
            })
            .addCase(updatePostman.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deletePostman.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePostman.fulfilled, (state, action) => {
                state.loading = false;
                state.postmen = state.postmen.filter((postman) => postman.id !== action.payload);
            })
            .addCase(deletePostman.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default postmanSlice.reducer;
