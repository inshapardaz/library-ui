import axios from "axios";
import { Mutex } from "async-mutex";

// Local import
import { API_URL } from '@/config';
import { accountUrl } from '@/utils/returnUrl';
import { warning } from '@/utils/notifications';
import i18n from '@/i18n';

//------------------------------------------

export const axiosPublic = axios.create({
    baseURL: API_URL,
    withCredentials: true
});
export const axiosPrivate = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

const mutex = new Mutex();

axiosPrivate.interceptors.request.use(
    async (config) => {
        await mutex.waitForUnlock();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let refreshTokenPromise = null; // Shared promise for refresh token requests

axiosPrivate.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            await mutex.waitForUnlock(); // Ensure no other request is modifying the token

            if (!refreshTokenPromise) {
                // If no refresh token request is in progress, create one
                const release = await mutex.acquire();

                refreshTokenPromise = axiosPublic.post("/accounts/refresh-token", {})
                    .then(() => {
                        refreshTokenPromise = null; // Reset the promise after success
                    })
                    .catch(refreshError => {
                        console.error(refreshError);
                        refreshTokenPromise = null; // Reset the promise after failure
                        // Access tokens are short-lived (10 min) and refresh tokens expire after a
                        // couple of days, so this fires reasonably often for a long-lived session -
                        // warn before the hard redirect so it reads as an expected timeout rather
                        // than the app silently kicking the user out mid-task.
                        warning({
                            title: i18n.t('login.sessionExpired.title'),
                            message: i18n.t('login.sessionExpired.message'),
                        });
                        // Give the toast a moment to actually render before the hard redirect
                        // navigates the page away, or the user never sees it at all.
                        setTimeout(() => {
                            window.location.href = accountUrl('/account/login');
                        }, 1500);
                        return Promise.reject(refreshError);
                    })
                    .finally(() => {
                        release();
                    });
            }

            try {
                await refreshTokenPromise; // Wait for the refresh token request to complete
                originalRequest._retry = true;
                return axiosPrivate(originalRequest); // Retry the original request
            } catch (refreshError) {
                return Promise.reject(refreshError); // Propagate the error if refresh fails
            }
        }

        return Promise.reject(error);
    }
);
