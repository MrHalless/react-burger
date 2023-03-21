import React from "react";
import { Navigate, useLocation } from "react-router";

export interface RoutePropsType {
  redirect: string;
  element: JSX.Element;
}

export const ProtectedRoute = ({
  redirect,
  element,
}: RoutePropsType): JSX.Element => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  return accessToken ? (
    element
  ) : (
    <Navigate to={redirect} state={{ from: location }} />
  );
};
