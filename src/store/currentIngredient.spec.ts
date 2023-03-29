import { ingredientMock } from "../utils/mocks";
import {
  currentIngredientReducer,
  initialIngredientState,
  resetCurrentIngredient,
  setCurrentIngredient,
} from "./currentIngredientSlice";

describe("Test reducer for Current Ingredient", () => {
  it("return the initial state Current Ingredient", () => {
    expect(
      currentIngredientReducer(
        { ...initialIngredientState },
        { type: undefined }
      )
    ).toEqual({
      isOpen: false,
    });
  });

  it("return the state with current ingredient and open modal is true", () => {
    expect(
      currentIngredientReducer(
        { ...initialIngredientState },
        setCurrentIngredient({ ...ingredientMock })
      )
    ).toEqual({
      ingredient: { ...ingredientMock },
      isOpen: true,
    });
  });

  it("return the state with undefined current ingredient and open modal is false", () => {
    expect(
      currentIngredientReducer(
        { ...initialIngredientState },
        resetCurrentIngredient()
      )
    ).toEqual({
      ingredient: undefined,
      isOpen: false,
    });
  });
});
