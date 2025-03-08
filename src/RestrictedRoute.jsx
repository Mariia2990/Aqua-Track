import { Navigate } from 'react-router-dom';
import { useAuth } from './hook/useAuth';

export const RestrictedRoute = ({ element, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing && localStorage.getItem('refreshToken')) {
    return null;
  }
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};
