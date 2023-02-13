import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../../hooks";

export const ProtectedRoute = ({ redirect, element }: any): any => {
  const location = useLocation();

  const {
    auth: { inLoggedIn },
  } = useStore();

  return inLoggedIn ? (
    element
  ) : (
    <Navigate to={redirect} state={{ from: location }} />
  );
};
