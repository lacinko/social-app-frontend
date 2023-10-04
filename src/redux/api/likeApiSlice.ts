import { apiSlice } from "./apiSlice";

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query(data) {
        return {
          url: "likes/",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Post"],
    }),
    updateLike: builder.mutation({
      query(data) {
        return {
          url: "likes/",
          method: "PATCH",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Post"],
    }),
    deleteLike: builder.mutation({
      query(id) {
        return {
          url: `likes/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useUpdateLikeMutation,
  useDeleteLikeMutation,
} = likeApiSlice;
