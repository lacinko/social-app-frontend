/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RequireUser from "@/components/RequireUser";
import Layout from "@/components/layout/Layout";
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("@/pages/VerifyEmailPage"));
const MeditationsPage = lazy(() => import("@/pages/MeditationsPage"));
const CreateCollectionPage = lazy(() => import("@/pages/CreateCollectionPage"));
const CollectionPageDetail = lazy(() => import("@/pages/CollectionPageDetail"));
const SubmitPostPage = lazy(() => import("@/pages/SubmitPostPage"));
const PostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      //PUBLIC ROUTES
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        //loader: userLoader,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "verifyemail/:verificationCode",
        element: <VerifyEmailPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "resetPassword/:resetToken",
        element: <ResetPasswordPage />,
      },
      {
        path: "unauthorized",
        element: <div>Unauthorized</div>,
      },
      //PRIVATE ROUTES - ADMIN
      {
        element: <RequireUser allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <div>Admin</div>,
          },
        ],
      },
      //PRIVATE ROUTES - USER
      {
        element: <RequireUser allowedRoles={["user"]} />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "meditations",
            element: <MeditationsPage />,
            children: [
              {
                path: "create-collection",
                element: <CreateCollectionPage />,
              },
            ],
          },
          {
            path: "meditations/:collectionId",
            element: <CollectionPageDetail />,
          },
          {
            path: "submit-post",
            element: <SubmitPostPage />,
          },
          {
            path: "create-collection",
            element: <CreateCollectionPage />,
          },
          {
            path: "post/:postId",
            element: <PostDetailPage />,
          },
        ],
      },
    ],
  },
]);
