import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../helpers/axios.helpers'
// ----------------------------------------------
export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
      getAuthors: builder.query({
        query: (libraryId) => ({ url : `/libraries/${libraryId}/authors`, method: 'get' }),
      }),
    }),
  })


  export const { useGetAuthorsQuery } = authorApi