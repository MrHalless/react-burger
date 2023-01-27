import { useStore } from "./useStore";

export const useTotalCostOrder = () => {
  const {
    burgerConstructor: { toppings, bun },
  } = useStore();

  let totalCost = 0;

  if (bun?.price) totalCost = totalCost + 2 * bun.price;
  totalCost = totalCost + toppings.reduce((acc, item) => acc + item.price, 0);

  return { totalCost };
};
