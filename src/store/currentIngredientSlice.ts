import { createSlice } from "@reduxjs/toolkit";
import { BurgerIngredientType } from "../models/api";

export interface CurrentIngredientStateType {
  isOpen: boolean;
  ingredient?: BurgerIngredientType;
}

export const initialIngredientState = {
  isOpen: false,
} as CurrentIngredientStateType;

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: initialIngredientState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
      state.isOpen = true;
    },
    resetCurrentIngredient: (state) => {
      state.isOpen = false;
      state.ingredient = undefined;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } =
  currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
