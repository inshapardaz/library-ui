import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../helpers/axios.helpers'
// ----------------------------------------------
export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
      getAuthors: builder.query({
        query: (libraryId) => `/library/${libraryId}/authors`,
      }),
    }),
  })


  export const { useGetAuthorsQuery } = authorApi