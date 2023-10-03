import { apiSlice } from "./apiSlice";

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollection: builder.query({
      query({ collectionId, collectionQueryString }) {
        return {
          url: `/collections/${collectionId}?${collectionQueryString}`,
          credentials: "include",
        };
      },
      providesTags: ["Collection"],
      transformResponse: ({ data }) => {
        return data.collection;
      },
    }),
    createCollection: builder.mutation({
      query(data) {
        console.log(data);
        return {
          url: "collections/",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Collections", "Collection"],
    }),
    getCollections: builder.query({
      query() {
        return {
          url: "collections/",
          credentials: "include",
        };
      },
      providesTags: ["Collections", "Collection"],
      transformResponse: ({ data }) => {
        return data.collections;
      },
    }),
  }),
});

export const {
  useGetCollectionQuery,
  useCreateCollectionMutation,
  useGetCollectionsQuery,
} = collectionApiSlice;
