// import { lazy } from "react";
// import { RestrictedRoute } from './RestrictedRoute';
// import { Route, Routes } from 'react-router-dom';
// import { PrivateRoute } from './PrivateRoute';


// const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
// const LoginPage = lazy(() => import("./pages/LogInPage/LogInPage"));
// const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));
// const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

export const App = () => {

  return (
    <>
          {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={
                <RestrictedRoute redirectTo="/tracker" component={<SignUpPage />}/>}/>
            <Route path="/signin" element={
                <RestrictedRoute redirectTo="/tracker" component={<LoginPage />}/>}/>
            <Route path="/tracker" element={
                <PrivateRoute redirectTo="/signin" component={<TrackerPage />}/>}/>

            <Route path="*" element={<NotFoundPage />} />
          </Routes> */}

    </>
  )
};
