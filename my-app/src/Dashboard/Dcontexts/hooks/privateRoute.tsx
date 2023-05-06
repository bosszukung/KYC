import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {useAuthContext} from '../../../Context/auth-context/auth-context-provider';


export function PrivateRoute() {
  const { state: {isUserLoggedIn},
} = useAuthContext();
  const state = useLocation();
  
  return isUserLoggedIn ? (
    <Outlet />
    ) : (
    <Navigate replace to="/" state={{ from: state.pathname + state.search }} />
  );
}

export default PrivateRoute;
