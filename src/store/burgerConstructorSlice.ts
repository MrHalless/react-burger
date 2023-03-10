import { createSlice } from "@reduxjs/toolkit";
import { BurgerIngredientType } from "../models/api";

export interface BurgerConstructorStateType {
  bun?: BurgerIngredientType;
  toppings: BurgerIngredientType[];
}

export const initialBurgerConstructorState = {
  toppings: [],
} as BurgerConstructorStateType;

const burgerConstractorSlice = createSlice({
  name: "currentIngredient",
  initialState: initialBurgerConstructorState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    setToppings: (state, action) => {
      state.toppings = action.payload;
    },
    resetBurgerConstructor: (state) => {
      state.toppings = [];
      state.bun = undefined;
    },
  },
});

export const { setBun, setToppings, resetBurgerConstructor } =
  burgerConstractorSlice.actions;
export const burgerConstructorReducer = burgerConstractorSlice.reducer;
