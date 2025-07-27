import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveParcelAssignments } from './postmanAction';

export const registerPostman = createAsyncThunk(
    'postman/registerPostman',
    async (postmanData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/postman/register', postmanData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to register postman');
        }
    }
);

export const loginPostman = createAsyncThunk(
    'postman/loginPostman',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/postman/login', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to login postman');
        }
    }
);

export const fetchPostmanById = createAsyncThunk(
    'postman/fetchPostmanById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/postman/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch postman');
        }
    }
);

export const updatePostman = createAsyncThunk(
    'postman/updatePostman',
    async (updatedPostman, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/postman/${updatedPostman.id}`, updatedPostman);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update postman');
        }
    }
);

export const deletePostman = createAsyncThunk(
    'postman/deletePostman',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:5000/api/postman/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete postman');
        }
    }
);

export const fetchAllPostmen = createAsyncThunk(
    'postman/fetchAllPostmen',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/postman/fetchAllPostmen');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch postmen');
        }
    }
);

export const addPostman = createAsyncThunk(
    'postman/addPostman',
    async (newPostman, { rejectWithValue }) => {
        try {
            console.log("new postman", newPostman);
            const response = await axios.post('http://localhost:5000/api/postman/register', newPostman);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add postman');
        }
    }
);

const initialState = {
    postmen: [],
    postman: null,
    loading: false,
    parcelAssignmentLoading: false,
    error: null,
};

const postmanSlice = createSlice({
    name: 'postman',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPostmen.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPostmen.fulfilled, (state, action) => {
                state.loading = false;
                state.postmen = action.payload;
            })
            .addCase(fetchAllPostmen.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
                state.error = null;
            })
            .addCase(loginPostman.fulfilled, (state, action) => {
                state.loading = false;
                state.postman = action.payload;
            })
            .addCase(loginPostman.rejected, (state, action) => {
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
            .addCase(addPostman.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPostman.fulfilled, (state, action) => {
                state.loading = false;
                state.postmen.push(action.payload);
            })
            .addCase(addPostman.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(saveParcelAssignments.pending, (state) => {
                state.parcelAssignmentLoading = true;
                state.error = null;
            })
            .addCase(saveParcelAssignments.fulfilled, (state, action) => {
                state.parcelAssignmentLoading = false;
                if (state.postman?.id === action.payload.id) {
                    state.postman = { ...state.postman, parcels: action.payload.parcels };
                }
            })
            .addCase(saveParcelAssignments.rejected, (state, action) => {
                state.parcelAssignmentLoading = false;
                state.error = action.payload;
            });
    },
});

export default postmanSlice.reducer;
