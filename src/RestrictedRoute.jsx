import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {

  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing && localStorage.getItem("refreshToken")) {
    return null;
  }
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
