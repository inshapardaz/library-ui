import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";

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

export const addNewLibrary = createAsyncThunk('libraries/addNewLibrary', async (initialLibrary) => {
    try {
        const response = await axiosPrivate.post('libraries', initialLibrary)
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
                // TODO: Perform transformation like link replacement
                state.libraries = action.payload
            })
            .addCase(fetchLibraries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewLibrary.fulfilled, (state, action) => {
                state.libraries.push(action.payload)
            })
    }
})

export const getLibraries = (state) => state.libraries.libraries;
export const getLibrariesStatus = (state) => state.libraries.status;
export const getLibrariesError = (state) => state.libraries.error;

export default librariesSlice.reducer;