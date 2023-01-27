import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredientsSlice";
import { currentIngredientReducer } from "./currentIngredientSlice";
import { burgerConstructorReducer } from "./burgerConstructorSlice";
import { orderReducer } from "./orderSlice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
});
