import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ redirect, element }: any): any => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  return accessToken ? (
    element
  ) : (
    <Navigate to={redirect} state={{ from: location }} />
  );
};
