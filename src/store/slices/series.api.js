import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "@/utils/axiosBaseQuery";
import { parseResponse } from "@/utils/parseResponse";
// ----------------------------------------------
export const seriesApi = createApi({
  reducerPath: "series",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Series", "Serie"],
  endpoints: (builder) => ({
    getSeries: builder.query({
      query: ({ libraryId, query, pageNumber, pageSize }) => {
        let queryVal = query ? `&query=${query}` : "";
        return {
          url: `/libraries/${libraryId}/series?pageNumber=${pageNumber}&pageSize=${pageSize}${queryVal}`,
          method: "get",
        };
      },
      transformResponse: (response) => parseResponse(response),
      providesTags: ["Series"],
    }),
    getSeriesById: builder.query({
      query: ({ libraryId, seriesId }) => ({
        url: `/libraries/${libraryId}/series/${seriesId}`,
        method: "get",
      }),
      transformResponse: (response) => parseResponse(response),
      providesTags: ["Series"],
    }),
  }),
});

export const {
  useGetSeriesQuery,
  useGetSeriesByIdQuery,
} = seriesApi;
