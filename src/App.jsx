import { lazy, Suspense, useEffect } from 'react';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { Loader } from './components/Loader/Loader';
import { selectIsRefreshing } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader absolute={true} />;
  }

  return (
    <>
      <Suspense fallback={<Loader absolute={true} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignInPage />}
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute
                  redirectTo="/tracker"
                  component={<TrackerPage />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" />
    </>
  );
};
