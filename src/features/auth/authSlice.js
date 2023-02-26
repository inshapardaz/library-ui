import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../helpers/axios.helpers";
import helpers from '../../helpers'
// ----------------------------------------------------------

const initialState = {
    user: helpers.isJsonString(window.localStorage.user) ? JSON.parse(window.localStorage.user) : null,
    status: 'idle', // idle || loading || succeeded || failed
    error: null,
    tokenStatus: 'idle',
    tokenError: null
};

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    try {
        const response = await axiosPublic.post('/accounts/authenticate', { email, password })
        return response.data
    } catch (err) {
        console.log(err.message)
        return Promise.reject(err.message)
    }
})

export const refreshToken = createAsyncThunk('auth/refresh-token', async (_, { getState }) => {
    try {
        var state = getState();
        if (state?.user?.refreshToken) {
            const response = await axiosPublic.post('/accounts/refresh-token', { refreshToken : state?.user?.refreshToken })
            return response.data
        }
    } catch (err) {
        console.log(err.message)
        return Promise.reject(err.message)
    }
})

export const init = createAsyncThunk('auth/init', async (_, { getState }) => {
    const user = getState()?.auth?.user;

    let currentDate = new Date();
    if (user?.refreshToken) {
        if (user?.accessToken && new Date(user.accessTokenExpiry) < currentDate.getTime()) {
            const response = await axiosPublic.post('/accounts/refresh-token', { refreshToken : user.refreshToken })
            return response.data
        }   
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            window.localStorage.user = null;
        },
        reset: (state) => {
            state.error = null
            state.status= 'idle'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // TODO: Perform transformation like link replacement
                if (action.payload)
                {
                    state.user = action.payload
                    window.localStorage.user = JSON.stringify(action.payload)
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(refreshToken.pending, (state) => {
                state.tokenStatus = 'loading'
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.tokenStatus = 'succeeded'
                state.user = action.payload
                window.localStorage.user = JSON.stringify(action.payload)
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.tokenStatus = 'failed'
                state.tokenError = action.error.message
            })
            .addCase(init.pending, (state) => {
                state.tokenStatus = 'loading'
            })
            .addCase(init.fulfilled, (state, action) => {
                state.tokenStatus = 'succeeded'
                if (action.payload)
                {
                    state.user = action.payload
                    window.localStorage.user = JSON.stringify(action.payload)
                }
            })
            .addCase(init.rejected, (state, action) => {
                state.tokenStatus = 'failed'
                state.tokenError = action.error.message
            })
    }
})

export const loggedInUser = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.user != null;
export const getLoginStatus = (state) => state.auth.status;
export const getLoginError = (state) => state.auth.error;
export const getTokenStatus = (state) => state.auth.tokenStatus;
export const getTokenError = (state) => state.auth.tokenError;

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;