import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
  }),
  endpoints: () => ({}),
});
