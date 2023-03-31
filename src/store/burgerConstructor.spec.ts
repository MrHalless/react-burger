import { ingredientMock } from "../utils/mocks";
import {
  initialBurgerConstructorState,
  burgerConstructorReducer,
  setBun,
  setToppings,
  resetBurgerConstructor,
} from "./burgerConstructorSlice";

describe("Test reducer for Burger Constructor", () => {
  it("return the initial state Burger Constructor", () => {
    expect(
      burgerConstructorReducer(
        { ...initialBurgerConstructorState },
        { type: undefined }
      )
    ).toEqual({
      toppings: [],
    });
  });

  it("return the state with bun", () => {
    expect(
      burgerConstructorReducer(
        { ...initialBurgerConstructorState },
        setBun({ ...ingredientMock })
      )
    ).toEqual({
      bun: { ...ingredientMock },
      toppings: [],
    });
  });

  it("return the state with toppings", () => {
    expect(
      burgerConstructorReducer(
        { ...initialBurgerConstructorState },
        setToppings([{ ...ingredientMock }, { ...ingredientMock }])
      )
    ).toEqual({
      toppings: [{ ...ingredientMock }, { ...ingredientMock }],
    });
  });

  it("return the state with initial igredients", () => {
    expect(
      burgerConstructorReducer(
        {
          bun: { ...ingredientMock },
          toppings: [
            { ...ingredientMock },
            { ...ingredientMock },
            { ...ingredientMock },
            { ...ingredientMock },
          ],
        },
        resetBurgerConstructor()
      )
    ).toEqual({
      bun: undefined,
      toppings: [],
    });
  });
});
