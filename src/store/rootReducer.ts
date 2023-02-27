import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredientsSlice";
import { currentIngredientReducer } from "./currentIngredientSlice";
import { burgerConstructorReducer } from "./burgerConstructorSlice";
import { orderReducer } from "./orderSlice";
import { profileReducer } from "./profileSlice";
import { authReducer } from "./authSlice";
import { menuProfileReducer } from "./menuProfileSlice";
import { errorRequestReducer } from "./errorRequestSlice";
import { headerNavReducer } from "./headerSlice";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  profile: profileReducer,
  auth: authReducer,
  menuProfile: menuProfileReducer,
  errorRequest: errorRequestReducer,
  headerNav: headerNavReducer,
});
