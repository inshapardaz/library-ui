import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import librariesReducer from '../features/libraries/librariesSlice';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    auth: authReducer,
    libraries: librariesReducer
  },
});
