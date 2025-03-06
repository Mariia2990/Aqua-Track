import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ redirectTo = '/' }) => {
  return <Navigate to={redirectTo} />;
};
