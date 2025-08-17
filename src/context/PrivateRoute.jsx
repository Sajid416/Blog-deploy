import React from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;  // Outlet দিয়ে nested routes রেন্ডার করবে
};

export default PrivateRoute;
