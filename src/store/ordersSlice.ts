import { createSlice } from "@reduxjs/toolkit";
import { OrdersType, OrderType } from "../models";

export interface OrdersStateType {
  socket: boolean;
  socketUrl: string;
  ordersData: OrdersType | null;
  viewOrder?: OrderType;
  error?: string;
}

export const initialOrdersState = {
  ordersData: null,
  socket: false,
} as OrdersStateType;

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    wsInit: (state, action) => {
      state.socketUrl = action.payload;
    },
    wsClose: (state) => {
      state.socket = false;
      state.ordersData = null;
    },
    wsOpen: (state) => {
      state.socket = true;
    },
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
    clearOrdersData: (state) => {
      state.ordersData = null;
    },
    setViewOrder: (state, action) => {
      state.viewOrder = action.payload;
    },
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  setViewOrder,
  clearOrdersData,
  wsInit,
  wsClose,
  wsOpen,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
