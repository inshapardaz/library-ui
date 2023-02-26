
import axios from "axios";

import { store } from "../store";
import { refreshToken } from '../features/auth/authSlice'

export const axiosPublic = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const axiosPrivate = axios.create({ baseURL: process.env.REACT_APP_API_URL });

axiosPrivate.interceptors.request.use(
    async (config) => {
      const user = store?.getState()?.auth?.user;
      let currentDate = new Date();
      if (user?.accessToken) {
        if (new Date(user.accessTokenExpiry) < currentDate.getTime()) {
          await store.dispatch(refreshToken());
        }

        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${
            store?.getState()?.auth?.user?.accessToken
          }`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );