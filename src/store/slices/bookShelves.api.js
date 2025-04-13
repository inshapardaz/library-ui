import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { parseResponse, removeLinks } from "@/utils/parseResponse";

import { booksApi } from '@/store/slices/books.api';
// ----------------------------------------------
export const bookShelvesApi = createApi({
  reducerPath: "bookShelves",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["BookShelves", "BookShelf"],
  endpoints: (builder) => ({
    getBookShelves: builder.query({
      query: ({ libraryId, query, pageNumber, pageSize, sortBy, sortDirection }) => {
        let queryVal = query ? `&query=${query}` : "";
        if (sortBy) {
          queryVal += `&sortBy=${sortBy}`;
        }
        if (sortDirection) {
          queryVal += `&sortDirection=${sortDirection}`;
        }
        return {
          url: `/libraries/${libraryId}/bookshelves?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`,
          method: "get",
        };
      },
      transformResponse: (response) => parseResponse(response),
      providesTags: ["BookShelves"],
    }),
    getBookShelfById: builder.query({
      query: ({ libraryId, bookShelfId }) => ({
        url: `/libraries/${libraryId}/bookshelves/${bookShelfId}`,
        method: "get",
      }),
      transformResponse: (response) => parseResponse(response),
      providesTags: ["BookShelves"],
    }),
    addBookShelf: builder.mutation({
      query: ({ libraryId, payload }) => ({
        url: `/libraries/${libraryId}/bookshelves`,
        method: "POST",
        data: removeLinks(payload),
      }),
      invalidatesTags: ["BookShelves"],
    }),
    updateBookShelf: builder.mutation({
      query: ({ libraryId, bookshelfId, payload }) => ({
        url: `/libraries/${libraryId}/bookshelves/${bookshelfId}`,
        method: "PUT",
        data: removeLinks(payload),
      }),
      invalidatesTags: ["BookShelves", "BookShelf"],
    }),
    deleteBookShelf: builder.mutation({
      query: ({ bookShelf }) => ({
        url: bookShelf.links.delete,
        method: "DELETE",
      }),
      invalidatesTags: ["BookShelves", "BookShelf"],
    }),
    addBookToBookShelf: builder.mutation({
      query: ({ libraryId, bookShelfId, bookId }) => ({
        url: `/libraries/${libraryId}/bookshelves/${bookShelfId}/books/${bookId}`,
        method: "PUT",
        data: { bookId },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(booksApi.util.invalidateTags(["Books", "Book"]))
      },
      invalidatesTags: ["BookShelves", "BookShelf"],
    }),
    removeBookFromBookShelf: builder.mutation({
      query: ({ removeLink }) => ({
        url: removeLink,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(booksApi.util.invalidateTags(["Books", "Book"]))
      },
      invalidatesTags: ["BookShelves", "BookShelf"],
    }),
  }),
});

export const {
  useGetBookShelvesQuery,
  useGetBookShelfByIdQuery,
  useAddBookShelfMutation,
  useUpdateBookShelfMutation,
  useDeleteBookShelfMutation,
  useAddBookToBookShelfMutation,
  useRemoveBookFromBookShelfMutation
} = bookShelvesApi;
