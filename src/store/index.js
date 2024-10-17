import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import { uiSlice } from "./slices/uiSlice";
import { authSlice } from "./slices/authSlice";
import { authApi } from "./slices/auth.api";
import { librariesApi } from "./slices/libraries.api";
// import { accountsApi } from "./slices/accountsSlice";
// import { booksApi } from "./slices/booksSlice";
// import { authorsApi } from "./slices/authorsSlice";
// import { seriesApi } from "./slices/seriesSlice";
// import { categoriesApi } from "./slices/categoriesSlice";
// import { periodicalsApi } from "./slices/periodicalsSlice";
// import { issuesApi } from "./slices/issuesSlice";
// import { issueArticlesApi } from "./slices/issueArticlesSlice";
// import { articlesApi } from "./slices/articlesSlice";
// import { toolsApi } from "./slices/toolsSlice";

// ----------------------------------------------

export const store = configureStore({
    reducer: {
        [uiSlice.name]: uiSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [librariesApi.reducerPath]: librariesApi.reducer,
        // [accountsApi.reducerPath]: accountsApi.reducer,
        // [booksApi.reducerPath]: booksApi.reducer,
        // [authorsApi.reducerPath]: authorsApi.reducer,
        // [seriesApi.reducerPath]: seriesApi.reducer,
        // [categoriesApi.reducerPath]: categoriesApi.reducer,
        // [periodicalsApi.reducerPath]: periodicalsApi.reducer,
        // [issuesApi.reducerPath]: issuesApi.reducer,
        // [issueArticlesApi.reducerPath]: issueArticlesApi.reducer,
        // [articlesApi.reducerPath]: articlesApi.reducer,
        // [toolsApi.reducerPath]: toolsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(librariesApi.middleware)
    // .concat(accountsApi.middleware)
    // .concat(booksApi.middleware)
    // .concat(authorsApi.middleware)
    // .concat(seriesApi.middleware)
    // .concat(categoriesApi.middleware)
    // .concat(periodicalsApi.middleware)
    // .concat(issuesApi.middleware)
    // .concat(issueArticlesApi.middleware)
    // .concat(articlesApi.middleware)
    // .concat(toolsApi.middleware),
});
