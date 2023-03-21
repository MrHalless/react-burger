import { StoreType } from "./index";
import { Middleware } from "redux";
import { clearOrdersData, setOrdersData, wsClose, wsInit } from "./ordersSlice";

export const socketMiddleware = (() => {
  return (store: StoreType) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsInit.type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === wsClose.type) {
          socket.close();
          dispatch(clearOrdersData());
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(setOrdersData(parseData));
        };

        socket.onclose = () => {
          dispatch(clearOrdersData());
        };
      }

      next(action);
    };
  };
})() as Middleware;
