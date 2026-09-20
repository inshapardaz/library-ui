import { createApi } from "@reduxjs/toolkit/query/react";

// Local imports
import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { parseResponse } from "@/utils/parseResponse";
// ----------------------------------------------
export const booksApi = createApi({
    reducerPath: "books",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Books", "Book", "Chapters", "Chapter", "BookPages"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({
                libraryId,
                query = null,
                author = null,
                category = null,
                series = null,
                sortBy = null,
                sortDirection = null,
                favorite = null,
                read = null,
                status = null,
                bookShelf = null,
                pageNumber = 1,
                pageSize = 12,
            }) => {
                let queryVal = query ? `&query=${query}` : "";
                if (author) {
                    queryVal += `&authorId=${author}`;
                }
                if (category) {
                    queryVal += `&categoryId=${category}`;
                }
                if (series) {
                    queryVal += `&seriesId=${series}`;
                }
                if (bookShelf) {
                    queryVal += `&bookShelfId=${bookShelf}`;
                }
                if (sortBy) {
                    queryVal += `&sortBy=${sortBy}`;
                }
                if (favorite) {
                    queryVal += "&favorite=true";
                }
                if (read !== undefined && read !== null) {
                    queryVal += `&read=${read}`;
                }
                if (status) {
                    queryVal += `&status=${status}`;
                }
                if (sortDirection) {
                    queryVal += `&sortDirection=${sortDirection}`;
                }
                return {
                    url: `/libraries/${libraryId}/books?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`,
                    method: "get",
                };
            },
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Books"],
        }),
        getBook: builder.query({
            query: ({ libraryId, bookId }) => ({
                url: `/libraries/${libraryId}/books/${bookId}`,
                method: "get",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Book"],
        }),
        getBookChapters: builder.query({
            query: ({ libraryId, bookId }) => ({
                url: `/libraries/${libraryId}/books/${bookId}/chapters`,
                method: "get",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Chapters"],
        }),
        getChapter: builder.query({
            query: ({ libraryId, bookId, chapterNumber }) => ({
                url: `/libraries/${libraryId}/books/${bookId}/chapters/${chapterNumber}`,
                method: "get",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["Chapters"],
        }),
        getChapterContents: builder.query({
            query: ({ libraryId, bookId, chapterNumber, language }) => ({
                url: `/libraries/${libraryId}/books/${bookId}/chapters/${chapterNumber}/contents?language=${language}`,
                method: "get",
                headers: {
                    "Accept-Language": language || "en-US",
                },
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["ChapterContents"],
        }),
        getBookPages: builder.query({
            query: ({
                libraryId,
                bookId,
                status = "Typing",
                assignment = null,
                reviewerAssignmentFilter = null,
                pageNumber = 1,
                pageSize = 12,
            }) => {
                let queryVal = `?pageNumber=${pageNumber}&pageSize=${pageSize}${status ? `&status=${status}` : ""
                    }${assignment ? `&assignmentFilter=${assignment}` : ""}${reviewerAssignmentFilter
                        ? `&reviewerAssignmentFilter=${reviewerAssignmentFilter}`
                        : ""
                    }`;
                return {
                    url: `/libraries/${libraryId}/books/${bookId}/pages${queryVal}`,
                };
            },
            transformResponse: (response) => parseResponse(response),
            providesTags: ["BookPages"],
        }),
        getBookPage: builder.query({
            query: ({ libraryId, bookId, pageNumber }) => ({
                url: `/libraries/${libraryId}/books/${bookId}/pages/${pageNumber}`,
                method: "GET",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["BookPages"],
        }),
        getBookPageContents: builder.query({
            query: ({ libraryId, bookId, pageNumber }) => ({
                url: `/libraries/${libraryId}/books/${bookId}/pages/${pageNumber}`,
                method: "GET",
            }),
            transformResponse: (response) => parseResponse(response),
            providesTags: ["BookPages"],
        }),
        addBookToFavorite: builder.mutation({
            query: ({ book }) => {
                return {
                    url: book.links.create_favorite,
                    method: "POST"
                };
            },
            invalidatesTags: ["Books", "Book"],
        }),
        removeBookFromFavorite: builder.mutation({
            query: ({ book }) => {
                return {
                    url: book.links.remove_favorite,
                    method: "DELETE"
                };
            },
            invalidatesTags: ["Books", "Book"],
        }),
        updateReadingProgress: builder.mutation({
            query: ({ libraryId, bookId, progressType, progressId, progressValue }) => ({
                url: `/libraries/${libraryId}/my/books/${bookId}`,
                method: "post",
                data: { progressType, progressId, progressValue },
            }),
            transformResponse: (response) => parseResponse(response),
            // Deliberately does not invalidate ["Book"]/["Books"]: progress is saved
            // continuously while reading, and refetching the book on every save would
            // recreate `book`/`chapters` identities the reader page depends on,
            // re-triggering source resolution (epub fetch/rebuild) mid-read.
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useGetBookChaptersQuery,
    useGetChapterQuery,
    useGetChapterContentsQuery,
    useGetBookPagesQuery,
    useGetBookPageQuery,
    useAddBookToFavoriteMutation,
    useRemoveBookFromFavoriteMutation,
    useUpdateReadingProgressMutation,
} = booksApi;
