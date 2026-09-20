import { createApi } from "@reduxjs/toolkit/query/react";

// Local imports
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { parseResponse } from "@/utils/parseResponse";
// ----------------------------------------------
export const notesApi = createApi({
    reducerPath: "notes",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: ({ libraryId, bookId }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/notes`,
                method: "get",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Notes"],
        }),
        upsertNote: builder.mutation({
            query: ({ libraryId, bookId, clientId, chapterId, startOffset, endOffset, text, comment }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/notes/${clientId}`,
                method: "put",
                data: { chapterId, startOffset, endOffset, text, comment },
            }),
            transformResponse: (response) => parseResponse(response),
            invalidatesTags: ["Notes"],
        }),
        deleteNote: builder.mutation({
            query: ({ libraryId, bookId, clientId }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}/notes/${clientId}`,
                method: "delete",
            }),
            invalidatesTags: ["Notes"],
        }),
    }),
});

export const {
    useGetNotesQuery,
    useUpsertNoteMutation,
    useDeleteNoteMutation,
} = notesApi;
