import { useStore } from "./useStore";

export const useOrder = () => {
  const {
    burgerIngredients: { ingredients },
  } = useStore();

  const orderIngredients = (ingredientsIds: string[]) =>
    ingredientsIds.map((id) =>
      ingredients.find((ingredient) => id === ingredient._id)
    );

  const getViewOrderIngredients = (ingredientsIds: string[]) =>
    orderIngredients(ingredientsIds).slice(0, 6);

  const getTotalOrderCost = (ingredientsIds: string[]) => {
    return orderIngredients(ingredientsIds).reduce((acc, item) => {
      if (item) return acc + item.price;
      return acc;
    }, 0);
  };

  const getOrderIngredients = (ingredientsIds: string[]) => {
    return ingredientsIds.map((id) =>
      ingredients.find((ingredient) => id === ingredient._id)
    );
  };

  return { getViewOrderIngredients, getTotalOrderCost, getOrderIngredients };
};
