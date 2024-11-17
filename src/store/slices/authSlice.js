import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// local Imports
import { getUser, setUser, clearUser } from "@/domain/userRepository";
import { axiosPublic } from '@/utils/axios.helpers';
// ----------------------------------------------------------

const initialState = {
    user: getUser(),
    status: "idle", // idle || loading || succeeded || failed
    error: null,
    forgetPasswordStatus: "idle", // idle || loading || succeeded || failed
    forgetPasswordError: null,
    resetPasswordStatus: "idle", // idle || loading || succeeded || failed
    resetPasswordError: null,
    tokenStatus: "idle",
    tokenError: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        try {
            const response = await axiosPublic.post("/accounts/authenticate", {
                email,
                password,
            });
            return response.data;
        } catch (e) {
            console.log(e.message);
            return Promise.reject(e.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const response = await axiosPublic.post("/accounts/revoke-token", {
                token: getUser()?.accessToken
            });
            return response.data;
        } catch (e) {
            console.error(e.message);
            return Promise.reject(e.message);
        }
    }
);

export const verifyCode = createAsyncThunk(
    "auth/verify-code",
    async ({ code }) => {
        try {
            const response = await axiosPublic.get(
                `/accounts/invitation/${code}`
            );
            return response.data;
        } catch (e) {
            console.log(e.message);
            return Promise.reject(e.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async ({ code, password, confirmPassword }) => {
        try {
            const response = await axiosPublic.post(
                "/accounts/reset-password",
                {
                    token: code,
                    password,
                    confirmPassword,
                }
            );
            return response.data;
        } catch (e) {
            console.log(e.message);
            return Promise.reject(e.message);
        }
    }
);

// eslint-disable-next-line no-unused-vars
export const init = createAsyncThunk("auth/init", async (_, { getState }) => {
    const user = getUser();

    let currentDate = new Date();
    if (user?.refreshToken) {
        if (
            user?.accessToken &&
            new Date(user.accessTokenExpiry) < currentDate.getTime()
        ) {
            try {
                const response = await axiosPublic.post(
                    "/accounts/refresh-token",
                    {
                        refreshToken: user.refreshToken,
                    }
                );

                setUser(response.data);
            } catch {
                clearUser();
                window.location.href = "/account/login";
            }
        }
    }
    return user;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.error = null;
            state.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                // TODO: Perform transformation like link replacement
                if (action.payload) {
                    state.user = action.payload;
                    setUser(action.payload);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.logoutStatus = "loading";
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutStatus = "succeeded";
                state.user = null;
                clearUser();
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutStatus = "failed";
                state.logoutUser = action.error.message;
            })
            .addCase(init.pending, (state) => {
                state.tokenStatus = "loading";
            })
            .addCase(init.fulfilled, (state, action) => {
                state.tokenStatus = "succeeded";
                if (action.payload) {
                    state.user = action.payload;
                    setUser(action.payload);
                }
            })
            .addCase(init.rejected, (state, action) => {
                state.tokenStatus = "failed";
                state.tokenError = action.error.message;
            })
            .addCase(verifyCode.pending, (state) => {
                state.tokenStatus = "loading";
            })
            .addCase(verifyCode.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordStatus = "loading";
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetPasswordStatus = "succeeded";
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordStatus = "failed";
                state.resetPasswordError = action.error.message;
            });
    },
});

export const loggedInUser = (state) => state?.auth?.user;
export const isLoggedIn = (state) => state?.auth?.user != null;
export const getLoginStatus = (state) => state?.auth?.status;
export const getLoginError = (state) => state?.auth?.error;
export const getLogoutStatus = (state) => state.auth.logoutStatus;
export const getLogoutError = (state) => state.auth.logoutError;
export const getTokenStatus = (state) => state?.auth?.tokenStatus;
export const getTokenError = (state) => state?.auth?.tokenError;
export const getResetPasswordStatus = (state) => state?.auth?.resetPasswordStatus;
export const getResetPasswordError = (state) => state?.auth?.resetPasswordError;

export const { reset } = authSlice.actions;
