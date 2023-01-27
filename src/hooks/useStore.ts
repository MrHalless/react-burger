import { useSelector as useReduxSelector } from "react-redux";
import { StoreState } from "../store/index";

export const useStore = () => {
  return useReduxSelector((state: StoreState) => state);
};
