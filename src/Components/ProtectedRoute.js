// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const auth = localStorage.getItem("User");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
