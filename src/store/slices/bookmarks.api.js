import { createApi } from "@reduxjs/toolkit/query/react";

// Local imports
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { parseResponse } from "@/utils/parseResponse";
// ----------------------------------------------
export const bookmarksApi = createApi({
    reducerPath: "bookmarks",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Bookmarks"],
    endpoints: (builder) => ({
        getBookmarks: builder.query({
            query: ({ libraryId, bookId }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/bookmarks`,
                method: "get",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Bookmarks"],
        }),
        upsertBookmark: builder.mutation({
            query: ({ libraryId, bookId, clientId, chapterId, position, name }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/bookmarks/${clientId}`,
                method: "put",
                data: { chapterId, position, name },
            }),
            transformResponse: (response) => parseResponse(response),
            invalidatesTags: ["Bookmarks"],
        }),
        deleteBookmark: builder.mutation({
            query: ({ libraryId, bookId, clientId }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/bookmarks/${clientId}`,
                method: "delete",
            }),
            invalidatesTags: ["Bookmarks"],
        }),
    }),
});

export const {
    useGetBookmarksQuery,
    useUpsertBookmarkMutation,
    useDeleteBookmarkMutation,
} = bookmarksApi;
