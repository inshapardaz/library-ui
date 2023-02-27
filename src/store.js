import { configureStore } from '@reduxjs/toolkit';
import librariesReducer from './features/libraries/librariesSlice';
import libraryReducer from './features/libraries/librarySlice';
import categoriesReducer from './features/libraries/categoriesSlice';
import booksReducer from './features/libraries/booksSlice';
//import authorsReducer from './features/libraries/authorsSlice';
import authReducer from './features/auth/authSlice';
import { authorApi } from './features/api/librarySlice'
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    libraries: librariesReducer,
    library: libraryReducer,
    categories: categoriesReducer,
    books: booksReducer,
    //authors: authorsReducer,
    [authorApi.reducerPath]: authorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorApi.middleware)
});
