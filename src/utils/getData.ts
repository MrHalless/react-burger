import { checkResponse } from "./checkResponse";
import { URL, INGREDIENTS_END_POINTS } from "./constant";

export const getData = async () => {
  return await fetch(`${URL}${INGREDIENTS_END_POINTS.GET_INGREDIENTS}`).then(
    checkResponse
  );
};
