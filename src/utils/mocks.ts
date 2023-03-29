import { OrderType } from "../models";

export const userMock = {
  email: "vladMock@email.com",
  name: "Vlad",
  password: "password",
};
export const userFromServerMock = {
  email: "mocvladMockk@email.com",
  name: "Vlad",
};
export const newPasswordMock = { password: "password" };

export const errorMessageMock = "Error";
export const errorMock = new Error(errorMessageMock);
export const ingredientMock = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

export const ingredientsIdsMock = [
  "60d3b41abdacab0026a733c7",
  "60d3b41abdacab0026a733cf",
  "60d3b41abdacab0026a733cc",
  "60d3b41abdacab0026a733c7",
];

const order = {
  createdAt: "2022-06-29T16:04:41.149Z",
  ingredients: [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733c7",
  ],
  name: "Антарианский флюоресцентный spicy бургер",
  number: 18717,
  status: "done",
  updatedAt: "2022-06-29T16:04:41.319Z",
  _id: "62bc781942d34a001c271072",
} as OrderType;

export const ordersDataMock = {
  orders: [{ ...order }, { ...order }, { ...order }],
  total: 550,
  totalToday: 50,
  success: true,
};

export const orderMock = {
  order: { ...order },
};

export const tokenMock = "413bfe58-00bf-4228-b47c-17d3ea8c30d3";
