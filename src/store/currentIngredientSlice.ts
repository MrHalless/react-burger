import { createSlice } from "@reduxjs/toolkit";
import { BurgerIngredientType } from "../models/api";

export interface CurrentIngredientStateType {
  isOpen: boolean;
  ingredient: BurgerIngredientType | null;
}

const initialIngredientState = {
  isOpen: false,
  ingredient: null,
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
      state.ingredient = null;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } =
  currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
