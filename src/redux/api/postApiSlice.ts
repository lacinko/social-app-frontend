import { apiSlice } from "./apiSlice";

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
    }),
    getPosts: builder.query({
      query() {
        return {
          url: "posts",
          method: "GET",
          credentials: "include",
        };
      },
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
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsByCollectionQuery,
  useGetPostsByCollectionQuery,
  useGetPostQuery,
} = postApiSlice;
