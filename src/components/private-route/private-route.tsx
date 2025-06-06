import {AuthorizationStatus} from '../utils/auth-statuses.ts';
import {AppRoute} from '../utils/routes.ts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}

export {PrivateRoute};
