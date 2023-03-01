import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../helpers/axios.helpers'

import { parseResponse } from '../../helpers/parseResponse';
// ----------------------------------------------
export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
      getBooks: builder.query({
        query: ({libraryId,
          query = null,
          author = null,
          categories = null,
          series = null,
          sortBy = null,
          sortDirection = null,
          favorite = null,
          read = null,
          status = null,
          pageNumber = 1,
          pageSize = 12}) => 
          {
            let queryVal = query ? `&query=${query}` : '';
            if (author) {
              queryVal += `&authorId=${author}`;
            }
            if (categories) {
              queryVal += `&categoryId=${categories}`;
            }
            if (series) {
              queryVal += `&seriesId=${series}`;
            }
            if (sortBy) {
              queryVal += `&sortBy=${sortBy}`;
            }
            if (favorite) {
              queryVal += '&favorite=true';
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
            return ({ url: `/libraries/${libraryId}/books?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`, method: 'get' })
          },
        transformResponse: (response) => parseResponse(response)
      }),
    }),
  })


  export const { useGetBooksQuery } = booksApi