import * as yup from "yup";

export const URL = "https://norma.nomoreparties.space";
export const SOCKET = "wss://norma.nomoreparties.space/orders";

export const ALL_ORDERS = "/all";

export const INGREDIENTS_END_POINTS = {
  GET_INGREDIENTS: "/api/ingredients",
};

export const ORDERS_END_POINTS = {
  POST_ORDERS: "/api/orders",
};

export const AUTH_END_POINTS = {
  POST_REGISTER: "/api/auth/register",
  POST_LOGIN: "/api/auth/login",
  POST_LOGOUT: "/api/auth/logout",
  POST_TOKEN: "/api/auth/token",
};

export const PROFILE_END_POINTS = {
  POST_FORGOT_PASSWORD: "/api/password-reset",
  POST_RESET_PASSWORD: "/api/password-reset/reset",
  GET_USER: "/api/auth/user",
  PATCH_USER: "/api/auth/user",
};

export const HEADERS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const ERRORS = {
  ERROR_NAME: "Кириллица c заглавной буквы, от 2 символов",
  ERROR_CODE: "Более одного символа",
  ERROR_EMAIL: "Неправильный формат email",
  ERROR_PASSWORD: "Пароль должен быть не меньше 6 символов",
  ERROR_REQUIRED_FIELD: "Это обязательное поле",
};

export const JWT_EXPIRED = "Bad request: 403 : jwt expired";

export const profileForm = yup
  .object({
    name: yup
      .string()
      .min(2)
      .required()
      .matches(/^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]*)?$/),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const testBun = "Краторная булка N-200i";
export const modalButton = "[class^=Modal_buttonClose]";
export const constructorSection = "[class^=BurgerConstructor_section]";
