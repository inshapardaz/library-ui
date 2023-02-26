import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/axios.helpers";
import { parseResponse } from '../../helpers/parseResponse'
// ----------------------------------------------------------

const initialState = {
    latestBooks: null,
    latestBooksStatus: 'idle', // idle || loading || succeeded || failed
    latestBooksError: null
};

export const fetchLatestBooks = createAsyncThunk('libraries/fetchLatestBooks', async (libraryId) => {
    try {
        const response = await axiosPrivate.get(`libraries/${libraryId}/books?pageNumber=1&pageSize=12&sortby=DateCreated&sortDirection=descending`)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
         
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLatestBooks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchLatestBooks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.library = parseResponse(action.payload)
            })
            .addCase(fetchLatestBooks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getLatestBooks = (state) => state.books.latestBooks;
export const getLatestBooksLoading = (state) => state.books.latestBooksStatus === 'loading';
export const getLatestBooksError = (state) => state.books.latestBooksError;

export default booksSlice.reducer;