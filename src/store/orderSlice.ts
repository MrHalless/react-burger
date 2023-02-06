import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingType } from "../models/index";
import { postOrdersData } from "../utils/getData";
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
  async (ingredients: string[]) => {
    const response = await postOrdersData(ingredients);
    return response.order.number;
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
  },
  extraReducers: (builder) => {
    builder.addCase(postOrders.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postOrders.fulfilled, (state, action) => {
      state.num = action.payload;
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
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
