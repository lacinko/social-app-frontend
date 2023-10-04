import { apiSlice } from "./apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query(data) {
        return {
          url: "/comments/",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Post", "Comments"],
    }),
    getComments: builder.query({
      query({ postId, parentId, commentQueryString }) {
        return {
          url: `/comments/${postId}/${parentId}?${commentQueryString}`,
          credentials: "include",
        };
      },
      providesTags: ["Post", "Comments"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } =
  commentApiSlice;
