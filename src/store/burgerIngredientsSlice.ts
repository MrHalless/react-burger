import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../utils/getData";
import { BurgerIngredientType } from "../models/api";
import { LoadingType } from "../models";

export interface BurgerIngredientsStateType extends LoadingType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  currentTab: "bun" | "sause" | "main";
  bunsRef: null | JSX.Element;
  ingredients: BurgerIngredientType[];
}

const initialIngredientsState = {
  loading: "idle",
  currentTab: "bun",
  ingredients: [],
} as unknown as BurgerIngredientsStateType;

export const fetchIngredients = createAsyncThunk(
  "burgerIngredients/fetchIngredients",
  async () => {
    const response = await getData();
    return response.data;
  }
);

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState: initialIngredientsState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    updateCountIngredient: (state, action) => {
      state.ingredients = action.payload;
    },
    resetCountIngredients: (state) => {
      state.ingredients = state.ingredients.map((ingredient) => ({
        ...ingredient,
        count: 0,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setCurrentTab, updateCountIngredient, resetCountIngredients } =
  burgerIngredientsSlice.actions;
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
