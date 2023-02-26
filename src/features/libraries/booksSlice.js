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
                state.latestBooksStatus = 'loading'
            })
            .addCase(fetchLatestBooks.fulfilled, (state, action) => {
                state.latestBooksStatus = 'succeeded'
                state.latestBooks = parseResponse(action.payload)
            })
            .addCase(fetchLatestBooks.rejected, (state, action) => {
                state.latestBooksStatus = 'failed'
                state.latestBooksError = action.error.message
            })
    }
})

export const getLatestBooks = (state) => state.books.latestBooks
export const getLatestBooksStatus = (state) => state.books.latestBooksStatus
export const getLatestBooksError = (state) => state.books.latestBooksError

export default booksSlice.reducer;