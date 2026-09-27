import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import { uiSlice } from "./slices/uiSlice";
import { authSlice } from "./slices/authSlice";
import { authApi } from "./slices/auth.api";
import { librariesApi } from "./slices/libraries.api";
import { booksApi } from "./slices/books.api";
import { authorsApi } from "./slices/authors.api";
import { seriesApi } from "./slices/series.api";
import { categoriesApi } from "./slices/categories.api";
import { articlesApi } from "./slices/articles.api";
import { periodicalsApi } from "./slices/periodicals.api";
import { issuesApi } from "./slices/issues.api";
import { bookShelvesApi } from "./slices/bookShelves.api";
import { bookmarksApi } from "./slices/bookmarks.api";
import { notesApi } from "./slices/notes.api";

// ----------------------------------------------

// Every RTK Query api slice, in one place. Adding a new `*.api.js` slice only
// requires adding it here rather than touching both `reducer` and `middleware`.
const apiSlices = [
    authApi,
    librariesApi,
    booksApi,
    authorsApi,
    seriesApi,
    categoriesApi,
    articlesApi,
    periodicalsApi,
    issuesApi,
    bookShelvesApi,
    bookmarksApi,
    notesApi,
];

export const store = configureStore({
    reducer: {
        [uiSlice.name]: uiSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        ...Object.fromEntries(apiSlices.map((api) => [api.reducerPath, api.reducer])),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlices.map((api) => api.middleware)),
});
