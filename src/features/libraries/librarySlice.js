import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";
import { parseResponse } from '../../helpers/parseResponse'
// ----------------------------------------------------------

const initialState = {
    library: null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null
};

export const fetchLibrary = createAsyncThunk('libraries/fetchLibrary', async (libraryId) => {
    try {
        const response = await axiosPrivate.get(`libraries/${libraryId}`)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
         
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLibrary.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchLibrary.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.library = parseResponse(action.payload)
            })
            .addCase(fetchLibrary.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getLibrary = (state) => state.library.library;
export const getLibraryStatus = (state) => state.library.status;
export const getLibraryError = (state) => state.library.error;

export default librarySlice.reducer;