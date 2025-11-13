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

    // /api/todo/add_todo
    addToDO: builder.mutation({
      query: (body) => {
        return {
          url: `/todo/add_todo/`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["todo"],
    }),

    ///api/todo/up_todo
    upToDO: builder.mutation({
      query: (body) => {
        return {
          url: `/todo/up_todo/`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["todo"],
    }),
    //get_users
    getUsers: builder.query({
      query: () => {
        return {
          url: `/todo/get_users`,
          method: "GET",
        };
      },
    }),
    // add_message
    sendMessage: builder.mutation({
      query: (body) => {
        return {
          url: `/todo/add_message/`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetToDoQuery,
  useAddToDOMutation,
  useUpToDOMutation,
  useGetUsersQuery,
  useSendMessageMutation,
} = todoApi;
