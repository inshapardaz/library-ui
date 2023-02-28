import { configureStore } from '@reduxjs/toolkit';
import librariesReducer from './features/libraries/librariesSlice';
import libraryReducer from './features/libraries/librarySlice';
import categoriesReducer from './features/libraries/categoriesSlice';
import booksReducer from './features/libraries/booksSlice';
import authReducer from './features/auth/authSlice';
import { authorApi } from './features/api/authorSlice'
import { seriesApi } from './features/api/seriesSlice'
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    libraries: librariesReducer,
    library: libraryReducer,
    categories: categoriesReducer,
    books: booksReducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authorApi.middleware)
      .concat(seriesApi.middleware)
});
