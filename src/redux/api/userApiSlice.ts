import { IUser } from "./types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      providesTags: ["User"],
      transformResponse: (result: { data: { user: IUser } }) => {
        return result.data.user;
      },
      /*async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },*/
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: "users/me",
          body: data,
          method: "PATCH",
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateUserMutation } = userApi;
