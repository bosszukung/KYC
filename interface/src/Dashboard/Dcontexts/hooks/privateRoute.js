import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {getUserType} from '../userType';

function PrivateRoute({ element: Component, userType, ...rest }) {
  if (getUserType() !== userType) {
    // If the user type doesn't match, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user type matches, render the specified component
  return <Route {...rest} element={<Component />} />;
}

export default PrivateRoute;
