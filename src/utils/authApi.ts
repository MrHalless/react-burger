import { URL, AUTH_END_POINTS, HEADERS as headers } from "./constant";
import { checkResponse } from "../utils/checkResponse";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export class AuthApi {
  public static postRegister = async (userData: UserData) => {
    return fetch(`${URL}${AUTH_END_POINTS.POST_REGISTER}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(userData),
    }).then(checkResponse);
  };

  public static postLogin = async (userData: Omit<UserData, "name">) => {
    return fetch(`${URL}${AUTH_END_POINTS.POST_LOGIN}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(userData),
    }).then(checkResponse);
  };

  public static postToken = async (refreshTokenData: {
    token: string | null;
  }) => {
    return fetch(`${URL}${AUTH_END_POINTS.POST_TOKEN}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(refreshTokenData),
    }).then(checkResponse);
  };

  public static postLogout = async (refreshTokenData: {
    token: string | null;
  }) => {
    return fetch(`${URL}${AUTH_END_POINTS.POST_LOGOUT}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(refreshTokenData),
    }).then(checkResponse);
  };
}
