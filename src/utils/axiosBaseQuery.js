import { axiosPrivate } from "./axios.helpers";
import { API_URL } from "@/config";

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: API_URL }) =>
        async ({ url, method, data, params }, api) => {
            try {
                // Signed-out visitors only ever read public data, so a failed request must
                // surface as an error in the UI instead of bouncing them to the login page.
                const isAnonymous = !api?.getState?.()?.auth?.user;
                const result = await axiosPrivate({
                    url: url.startsWith("http") ? url : baseUrl + url,
                    method,
                    data,
                    params,
                    skipAuthRedirect: isAnonymous,
                });

                return { data: result.data };
            } catch (axiosError) {
                let err = axiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export default axiosBaseQuery;
