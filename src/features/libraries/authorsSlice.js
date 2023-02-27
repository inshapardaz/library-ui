import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";
import { parseResponse } from '../../helpers/parseResponse'
// ----------------------------------------------------------

const initialState = {
    authors: null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null
};

export const fetchAuthors = createAsyncThunk('libraries/fetchAuthors', 
    async ({ libraryId, query, authorType, pageNumber, pageSize }) => {
        try {
            let queryVal = query ? `&query=${query}` : '';
            if (authorType) {
                queryVal += `authorType=${authorType}`;
            }
            const response = await axiosPrivate.get(`libraries/${libraryId}/authors?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`)
            return response.data
        } catch (err) {
            return err.message
        }
})

export const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
         
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthors.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.authors = parseResponse(action.payload)
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAuthors = (state) => state.authors.authors;
export const getAuthorsStatus = (state) => state.authors.status;
export const getAuthorsError = (state) => state.authors.error;

export default authorsSlice.reducer;