import { Suspense } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "../ui/toaster";

function Layout() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Toaster />
      <Header />
      <main className="flex-grow w-full h-full mx-auto max-w-screen-xl">
        <Suspense fallback={<div>Loading....</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
