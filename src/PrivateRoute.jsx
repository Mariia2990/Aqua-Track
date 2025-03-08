import { Navigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";

export const PrivateRoute = ({ element, redirectTo = "/" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : element;
};
