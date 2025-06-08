import { useAppSelector } from '../../store';
import { AppRoute } from '../utils/routes.ts';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../utils/auth-statuses.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  requiredStatus?: AuthorizationStatus;
}

function PrivateRoute({ children, requiredStatus = AuthorizationStatus.Auth }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.offers.authorizationStatus);

  return authorizationStatus === requiredStatus
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export { PrivateRoute };
