import { checkResponse } from "./checkResponse";
import { URL, INGREDIENTS_END_POINTS, ORDERS_END_POINTS } from "./constant";

function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const getData = async () => {
  return await request(`${URL}${INGREDIENTS_END_POINTS.GET_INGREDIENTS}`);
};

export const postOrdersData = async (ingredientsId: string[]) => {
  return request(`${URL}${ORDERS_END_POINTS.POST_ORDERS}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsId }),
  });
};
