import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateUser } from "./authActions";

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null
const storedUserInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;
   
const initialState = {
    isLoading: false,
    updateUserLoading: false,
    userInfo: storedUserInfo || null,
    userToken,
    error: null,
    success: false,
    msg: ""
}

const authSlice= createSlice({
    name: "auth",
    initialState, 
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('userToken')
            state.isLoading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
        setCredentials: (state, { payload }) => {
            if (payload?.data?.user)
            state.userInfo = payload.data.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = true;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.userToken = action.payload.userToken;
            console.log("user", action.payload)
            localStorage.setItem('userToken', action.payload.userToken);
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(updateUser.pending, (state) => {
            state.updateUserLoading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.updateUserLoading = false;
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
            state.success = true;
            state.msg = "User updated successfully";
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.updateUserLoading = false;
            state.error = action.payload;
            state.success = false;
        })
    }
})

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;