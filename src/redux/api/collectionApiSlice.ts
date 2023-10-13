import { apiSlice } from "./apiSlice";
import { Collection, CollectionAccount, CollectionAccounts } from "./types";

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
    getCollections: builder.query<Collection[], string | null>({
      query(collectionsQueryString) {
        return {
          url: `collections?${collectionsQueryString}`,
          credentials: "include",
        };
      },
      providesTags: ["Collections", "Collection"],
      transformResponse: (result: { data: { collections: Collection[] } }) => {
        return result.data.collections;
      },
    }),
    leaveCollection: builder.mutation({
      query(collectionId) {
        return {
          url: `/collections/accounts/${collectionId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["CollectionsAccounts"],
    }),
    joinCollection: builder.mutation({
      query({ collectionId, role }) {
        return {
          url: `/collections/accounts/${collectionId}`,
          method: "POST",
          body: { role },
          credentials: "include",
        };
      },
      invalidatesTags: ["CollectionsAccounts"],
    }),
    getCollectionsAccounts: builder.query<CollectionAccounts, string>({
      query(collectionsAccountsQueryString) {
        return {
          url: `/collections/accounts?${collectionsAccountsQueryString}`,
          credentials: "include",
        };
      },
      providesTags: ["CollectionsAccounts"],
      transformResponse: (response: {
        data: { collectionsAccounts: CollectionAccount[] };
      }): CollectionAccounts => {
        const collectionsAccountsObject = {} as CollectionAccounts;

        response?.data?.collectionsAccounts.map((account) => {
          collectionsAccountsObject[account.collectionId] = account.role;
        });

        return collectionsAccountsObject;
      },
    }),
  }),
});

export const {
  useGetCollectionQuery,
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useLeaveCollectionMutation,
  useJoinCollectionMutation,
  useGetCollectionsAccountsQuery,
} = collectionApiSlice;
