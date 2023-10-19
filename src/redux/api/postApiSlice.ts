import { apiSlice } from "./apiSlice";
import { Post } from "./types";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query(data) {
        return {
          url: "posts",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query<Post[], string>({
      query(postsQueryString) {
        return {
          url: `posts?${postsQueryString}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response?.data?.posts;
      },
      providesTags: ["Post"],
    }),
    getPostsByCollection: builder.query({
      query({ collectionId, postQueryString }) {
        return {
          url: `posts/collection/${collectionId}?${postQueryString}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Post"],
      transformResponse: (response) => {
        return response.data.posts;
      },
    }),
    getPost: builder.query({
      query({ postId, postQueryString }) {
        return {
          url: `posts/${postId}?${postQueryString}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Post"],
      transformResponse: (response) => {
        return response.data.post;
      },
    }),
    updatePost: builder.mutation({
      query({ id, values }) {
        return {
          url: `posts/${id}`,
          method: "PATCH",
          body: { ...values },
          credentials: "include",
        };
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsByCollectionQuery,
  useGetPostsByCollectionQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
