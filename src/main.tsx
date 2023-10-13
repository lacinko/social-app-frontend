import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";
import AuthMiddleware from "./components/AuthMiddleware.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </Provider>
  </React.StrictMode>
);
