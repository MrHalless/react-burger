import { useCallback } from "react";
import { setActiveMenuProfileItem } from "../store/menuProfileSlice";
import { useDispatch } from "./useDispatch";

export const useMenuProfile = () => {
  const dispatch = useDispatch();
  const setActiveMenuProfile = useCallback(
    (navItem: string) => dispatch(setActiveMenuProfileItem(navItem)),
    [dispatch]
  );
  return { setActiveMenuProfile };
};
