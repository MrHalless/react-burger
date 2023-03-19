import { useEffect } from "react";
import { setViewOrder } from "../store/ordersSlice";
import { useDispatch } from "./useDispatch";
import { useStore } from "./useStore";

export const useViewOrder = (id: string | undefined) => {
  const dispatch = useDispatch();

  const {
    orders: { ordersData },
  } = useStore();

  useEffect(() => {
    if (id && ordersData) {
      dispatch(setViewOrder(ordersData.orders.find((item) => item._id === id)));
    }
  }, [id, ordersData, dispatch]);
};
