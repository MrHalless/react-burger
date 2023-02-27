import { useCallback } from "react";
import { setActiveLink } from "../store/headerSlice";
import { useDispatch } from "./useDispatch";

export const useNavHeader = () => {
  const dispatch = useDispatch();
  const setActive = useCallback(
    (navItem: string) => dispatch(setActiveLink(navItem)),
    [dispatch]
  );
  return { setActive };
};
