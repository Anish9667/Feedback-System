import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
