import RequireUser from "@/components/RequireUser";
import Layout from "@/components/layout/Layout";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import { createBrowserRouter } from "react-router-dom";
import { userLoader } from "./Loader";
import MeditationsPage from "@/pages/MeditationsPage";
import CreateCollectionPage from "@/pages/CreateCollectionPage";
import CollectionPageDetail from "@/pages/CollectionPageDetail";
import SubmitPostPage from "@/pages/SubmitPostPage";
import PostDetailPage from "@/pages/PostDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      //PUBLIC ROUTES
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
            element: <div>Profile</div>,
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
            path: "post/:postId",
            element: <PostDetailPage />,
          },
        ],
      },
    ],
  },
]);
