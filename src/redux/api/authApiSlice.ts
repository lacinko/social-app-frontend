import { LoginInput } from "../../pages/login.page";
import { RegisterInput } from "../../pages/register.page";
import { IGenericResponse } from "./types";
import { userApi } from "./userApiSlice";
import { apiSlice } from "./apiSlice";
import { logout } from "../features/userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(data) {
        const url = "auth/register";
        return {
          url: url,
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationCode: string }
    >({
      query({ verificationCode }) {
        return {
          url: `auth/verifyemail/${verificationCode}`,
          method: "GET",
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.util.upsertQueryData("getMe", null, null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query({ email }) {
        return {
          url: "auth/forgotpassword",
          method: "POST",
          body: { email },
        };
      },
    }),
    resetPassword: builder.mutation<
      IGenericResponse,
      { password: string; passwordConfirm: string; resetToken: string }
    >({
      query({ password, passwordConfirm, resetToken }) {
        return {
          url: `auth/resetpassword/${resetToken}`,
          method: "PATCH",
          body: { password, passwordConfirm },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
