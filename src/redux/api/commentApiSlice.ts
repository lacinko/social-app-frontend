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
    deleteComment: builder.mutation({
      query(id) {
        return {
          url: `/comments/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query({ id, content }) {
        return {
          url: `/comments/${id}`,
          body: { content },
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApiSlice;
