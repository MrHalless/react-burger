import { useStore } from "./useStore";

export const useIngredientsIds = () => {
  const {
    burgerConstructor: { toppings, bun },
  } = useStore();

  let orderIngredientsIds = [] as string[];
  if (toppings.length)
    orderIngredientsIds = [
      ...orderIngredientsIds,
      ...toppings.map((item) => item._id),
    ];
  if (bun?._id) {
    orderIngredientsIds.unshift(bun._id);
    orderIngredientsIds.push(bun._id);
  }

  return { orderIngredientsIds };
};
