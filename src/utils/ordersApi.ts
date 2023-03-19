import { checkResponse } from "./checkResponse";
import { ORDERS_END_POINTS, URL, HEADERS as headers } from "./constant";

export interface IngredientsIdsPropsType {
  ingredientsIds: string[];
  token: string;
}

class OrdersApi {
  server: string;

  constructor(server: string) {
    this.server = server;
  }

  postOrders = async (orderData: IngredientsIdsPropsType) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: orderData.token,
    };
    return fetch(`${this.server}${ORDERS_END_POINTS.POST_ORDERS}`, {
      method: "POST",
      headers: { ...reqHeaders },
      body: JSON.stringify({ ingredients: orderData.ingredientsIds }),
    }).then(checkResponse);
  };
}

export const ordersApi = new OrdersApi(URL);
