import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";
import { parseResponse } from '../../helpers/parseResponse'
// ----------------------------------------------------------

const initialState = {
    categories: null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null
};

export const fetchCategories = createAsyncThunk('libraries/fetchCategories', async (libraryId) => {
    try {
        const response = await axiosPrivate.get(`libraries/${libraryId}/categories`)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
         
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = parseResponse(action.payload)
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;