import { userApi } from "@/redux/api/userApiSlice";
import React from "react";
import { useCookies } from "react-cookie";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in,
  });

  console.log("From middleware: ", cookies.logged_in);

  if (isLoading) {
    return <div>Loading....</div>;
    //<FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
