import React from "react";
import { Navigate } from "react-router";
import { To } from "history";
import { useStore } from "../../hooks";

export interface RoutePropsType {
  redirect: string;
  element: JSX.Element;
}

export const AuthRoute = ({
  redirect,
  element,
}: RoutePropsType): JSX.Element => {
  const {
    profile: { user },
  } = useStore();

  return !user ? element : <Navigate to={{ pathname: redirect } as To} />;
};
