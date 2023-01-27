import { checkResponse } from "./checkResponse";
import { URL, INGREDIENTS_END_POINTS, ORDERS_END_POINTS } from "./constant";

export const getData = async () => {
  return await fetch(`${URL}${INGREDIENTS_END_POINTS.GET_INGREDIENTS}`).then(
    checkResponse
  );
};

export const postOrdersData = async (ingredientsId: string[]) => {
  return fetch(`${URL}${ORDERS_END_POINTS.POST_ORDERS}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsId }),
  }).then(checkResponse);
};
