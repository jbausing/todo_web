import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getToDo: builder.query({
      query: () => {
        return {
          url: `/todo/get_todo`,
          method: "GET",
        };
      },
      providesTags: ["todo"],
    }),
  }),
});

export const { useGetToDoQuery } = todoApi;
