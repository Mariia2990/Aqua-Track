import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({  redirectTo = '/' }) => {

    return <Navigate to={redirectTo} />;
};
