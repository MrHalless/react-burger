import { UserData } from "./authApi";
import { URL, PROFILE_END_POINTS, HEADERS as headers } from "./constant";
import { checkResponse } from "./checkResponse";

export type ForgotPassword = {
  password: string;
};

export type ResetPassword = ForgotPassword & {
  token: string;
};

export interface AuthUserData {
  userData: UserData;
  token: string;
}

export class ProfileApi {
  public static getUser = async (token: string) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: token,
    };
    return fetch(`${URL}${PROFILE_END_POINTS.GET_USER}`, {
      headers: { ...reqHeaders },
    }).then(checkResponse);
  };

  public static patchUser = async (authUserData: AuthUserData) => {
    const reqHeaders = {
      ...headers.headers,
      authorization: authUserData.token,
    };
    return fetch(`${URL}${PROFILE_END_POINTS.PATCH_USER}`, {
      method: "PATCH",
      headers: { ...reqHeaders },
      body: JSON.stringify(authUserData.userData),
    }).then(checkResponse);
  };

  public static postForgotPassword = async (data: ForgotPassword) => {
    return fetch(`${URL}${PROFILE_END_POINTS.POST_FORGOT_PASSWORD}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };

  public static postResetPassword = async (data: ResetPassword) => {
    return fetch(`${URL}${PROFILE_END_POINTS.POST_RESET_PASSWORD}`, {
      method: "POST",
      ...headers,
      body: JSON.stringify(data),
    }).then(checkResponse);
  };
}
