import { apiSlice } from "./apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query(data) {
        console.log(data);
        return {
          url: "/comments/",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApiSlice;
