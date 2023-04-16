import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getUserType } from '../userType';
import { useAuthContext } from '../../../Context';

function PrivateRoute({ allowedRoles }) {
  const { state: { isUserLoggedIn } } = useAuthContext();
  const { pathname, search } = useLocation();
  const userType = getUserType();

  if (!userType || !allowedRoles.includes(userType)) {
    return <Navigate replace to="/login" />;
  }

  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate 
      replace 
      to={{ pathname: '/', state: { from: `${pathname}${search}` } }}
    />
  );
}

export default PrivateRoute;

