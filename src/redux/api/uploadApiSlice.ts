import { apiSlice } from "./apiSlice";

export const uploadAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{}, FormData>({
      query(data) {
        console.log(data);
        return {
          url: "upload",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      //TODO OPTIMISTIC UPDATES
      //TODO DRAG N DROP
      //TODO INFINITE SCROLL
      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          uploadAPI.util.updateQueryData("uploadImage", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    uploadSingleImage: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: "upload/single",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
    }),
    uploadMultipleImage: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: "upload/multiple",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadAPI;
