import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingType } from "../models";
import { IngredientsIdsPropsType, ordersApi } from "../utils/ordersApi";

export interface OrderStateType extends LoadingType {
  isOpen: boolean;
  num: string | null;
  ingredientsIds: string[];
  total: number;
  error?: string;
}

const initialIngredientsState = {
  isOpen: false,
  loading: "idle",
  num: null,
  total: 0,
  ingredientsIds: [],
} as OrderStateType;

export const postOrders = createAsyncThunk(
  "currentIngredient/postOrders",
  async (body: IngredientsIdsPropsType) => {
    const response = await ordersApi.postOrders(body);
    return response;
  }
);

const orderSlice = createSlice({
  name: "currentIngredient",
  initialState: initialIngredientsState,
  reducers: {
    setIngredientsIds: (state, action) => {
      state.ingredientsIds = action.payload;
    },
    setOrderTotal: (state, action) => {
      state.total = action.payload;
    },
    setOpenOrderModal: (state, action) => {
      state.isOpen = action.payload;
    },
    resetOrder: (state) => {
      state.isOpen = false;
      state.num = null;
    },
    clearOrderError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrders.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postOrders.fulfilled, (state, action) => {
      state.num = action.payload.order.number;
      state.loading = "succeeded";
    });
    builder.addCase(postOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const {
  setIngredientsIds,
  setOrderTotal,
  setOpenOrderModal,
  resetOrder,
  clearOrderError,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
