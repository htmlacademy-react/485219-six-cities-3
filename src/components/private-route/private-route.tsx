import { useAppSelector } from '../../store';
import { AppRoute } from '../utils/routes.ts';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../utils/auth-statuses.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <div style={{ display: 'none' }} />;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export { PrivateRoute };
