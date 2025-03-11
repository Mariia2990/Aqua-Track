import { lazy } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

export const App = () => {


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup"element={
              <RestrictedRoute redirectTo="/tracker" component={<SignUpPage />}/>
            }
          />
          <Route path="/signin" element={
              <RestrictedRoute redirectTo="/tracker" component={<SignInPage />}/>
            }
          />
          <Route path="/tracker" element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster position="top-right"/>
    </>
  );
};
