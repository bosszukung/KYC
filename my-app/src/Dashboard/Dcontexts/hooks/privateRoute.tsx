import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {useAuthContext} from '../../../Context/auth-Context';


export function PrivateRoute() {
  const { state: {isUserLoggedIn},
} = useAuthContext();
  const { pathname, search } = useLocation();
  
  return isUserLoggedIn ? (
    <Outlet />
    ) : (
    <Navigate replace to="/login" state={{ from: pathname + search }} />
  );
}

export default PrivateRoute;
