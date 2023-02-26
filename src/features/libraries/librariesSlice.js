import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";
import { parseResponse } from '../../helpers/parseResponse'

// ----------------------------------------------------------

const initialState = {
    libraries: null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null
};


export const fetchLibraries = createAsyncThunk('libraries/fetchLibraries', async () => {
    try {
        const response = await axiosPrivate.get('libraries')
        return response.data
    } catch (err) {
        return err.message
    }
})

export const librariesSlice = createSlice({
    name: 'libraries',
    initialState,
    reducers: {
         
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLibraries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchLibraries.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.libraries = parseResponse(action.payload)
            })
            .addCase(fetchLibraries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getLibraries = (state) => state.libraries.libraries;
export const getLibrariesStatus = (state) => state.libraries.status;
export const getLibrariesError = (state) => state.libraries.error;

export default librariesSlice.reducer;