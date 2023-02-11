import React from "react";
import { Navigate } from "react-router";
import { To } from "history";
import { useStore } from "../../hooks";

export const AuthRoute = ({ redirect, element }: any): any => {
  const {
    profile: { user },
  } = useStore();

  return !user ? element : <Navigate to={{ pathname: redirect } as To} />;
};
