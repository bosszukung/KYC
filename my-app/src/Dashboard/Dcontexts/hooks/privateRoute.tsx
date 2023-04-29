import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {useAuthContext} from '../../../Context/auth-Context';


function PrivateRoute() {
  const { state: {isUserLoggedIn},
} = useAuthContext();
  const { pathname, search } = useLocation();
  
  return isUserLoggedIn ? (
    <Outlet />
    ) : (
    <Navigate replace to="/" state={{ from: pathname + search }} />
  );
}

export default PrivateRoute;
