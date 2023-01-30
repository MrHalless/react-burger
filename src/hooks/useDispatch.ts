import { useDispatch as useReduxDispatch } from "react-redux";
import { AppDispatch } from "../store/index";

export const useDispatch = () => {
  const dispatch: AppDispatch = useReduxDispatch();
  return dispatch;
};
