import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "../Loader/Loader";

export const Layout = () => {
  return (
    <>
        <Suspense fallback={<Loader absolute={true}/>}>
          <Outlet />
        </Suspense>
    </>
  );
};
