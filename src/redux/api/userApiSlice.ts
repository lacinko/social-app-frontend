import { setUser } from '../features/userSlice'
import { IUser } from './types'
import { apiSlice } from './apiSlice'

apiSlice.enhanceEndpoints({ addTagTypes: ['User'] })

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: 'user/me',
          credentials: 'include',
        }
      },
      // @ts-expect-error - this is a bug in the current version of RTK Query
      providesTags: ['User'],
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useGetMeQuery } = userApi
