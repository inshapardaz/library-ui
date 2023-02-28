import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../helpers/axios.helpers'

import { parseResponse } from '../../helpers/parseResponse';
// ----------------------------------------------
export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
      getAuthors: builder.query({
        query: ({libraryId, query, authorType, pageNumber, pageSize}) => 
          {
            let queryVal = query ? `&query=${query}` : '';
            if (authorType) {
              queryVal += `authorType=${authorType}`;
            }
            return ({ url: `/libraries/${libraryId}/authors?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`, method: 'get' })
          },
        transformResponse: (response) => parseResponse(response)
      }),
    }),
  })


  export const { useGetAuthorsQuery } = authorApi