import React, { useCallback } from "react";
import { clearAuthError, postToken } from "../store/authSlice";
import { setError } from "../store/errorRequestSlice";
import { clearProfileError } from "../store/profileSlice";
import { JWT_EXPIRED } from "../utils/constant";
import { useDispatch } from "./useDispatch";
import { useStore } from "./useStore";

export const useErrorHandler = () => {
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");
  const {
    order: { error: errorOrder },
    profile: { error: errorProfile },
    auth: { error: errorAuth },
  } = useStore();

  const setRequestError = useCallback(
    (error: string) => dispatch(setError(error)),
    [dispatch]
  );

  const callErrorHandler = () => {
    errorProfile === JWT_EXPIRED &&
      dispatch(clearProfileError()) &&
      dispatch(postToken(refreshToken));
    errorProfile &&
      errorProfile !== JWT_EXPIRED &&
      setRequestError(errorProfile) &&
      dispatch(clearProfileError());
    errorAuth && setRequestError(errorAuth) && dispatch(clearAuthError());
    errorOrder && setRequestError(errorOrder) && dispatch(clearAuthError());
  };

  return { callErrorHandler };
};
