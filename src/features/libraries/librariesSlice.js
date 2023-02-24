import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------------------------------------------

const API_URL = `https://api.nawishta.co.uk/libraries`

const initialState = {
    libraries: null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null
};


export const fetchLibraries = createAsyncThunk('libraries/fetchLibraries', async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const addNewLibrary = createAsyncThunk('libraries/addNewLibrary', async (initialLibrary) => {
    try {
        const response = await axios.post(API_URL, initialLibrary)
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

export const { toggleUiMode, setLocale } = librariesSlice.actions;
export default librariesSlice.reducer;