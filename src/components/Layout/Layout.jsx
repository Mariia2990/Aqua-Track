import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <>
      <header>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </header>
    </>
  );
};
