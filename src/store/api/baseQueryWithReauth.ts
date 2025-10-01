import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { logout } from "../auth/authSlice";

const baseUrl = `${import.meta.env.VITE_API_BASE}/api`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (args.url === "/user/login/" || args.url === "/user/refresh-token/") {
      return result;
    }

    const refreshResult = await baseQuery(
      { url: "/user/refresh-token/", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.error) {
      // If refresh failed, dispatch logout action
      api.dispatch(logout());
      return refreshResult;
    }

    // Retry the original request with the new token
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
