import { errorMessageMock, errorMock, userMock } from "../utils/mocks";
import {
  clearAuthError,
  authReducer,
  initialAuthState,
  postRegister,
  postLogin,
  postToken,
  postLogout,
} from "./authSlice";

describe("Action creators and reducer for Auth", () => {
  it("should create an action for empty error", () => {
    const expectedAction = {
      type: clearAuthError.type,
    };
    expect(clearAuthError()).toEqual(expectedAction);
  });

  it("return the initial state", () => {
    expect(authReducer({ ...initialAuthState }, { type: undefined })).toEqual(
      {}
    );
  });

  it("return undefined error", () => {
    expect(authReducer(undefined, clearAuthError())).toEqual({
      error: undefined,
    });
  });

  it("return undefined error and status loading is pending for register", () => {
    const action = postRegister.pending("", userMock);
    expect(authReducer(undefined, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("return undefined error and status loading is fulfilled for register", () => {
    const action = postRegister.fulfilled("", "", userMock);
    expect(authReducer({ ...initialAuthState }, action)).toStrictEqual({
      loading: "succeeded",
    });
  });

  it('return error message "Error" and status loading is failed for register', () => {
    const action = postRegister.rejected(errorMock, "", userMock);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      error: errorMessageMock,
      loading: "failed",
    });
  });

  it("return undefined error and status loading is pending for login", () => {
    const action = postLogin.pending("", userMock);
    expect(authReducer(undefined, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("return undefined error and status loading is fulfilled for login", () => {
    const action = postLogin.fulfilled("", "", userMock);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      loading: "succeeded",
    });
  });

  it('return error message "Error" and status loading is failed for login', () => {
    const action = postLogin.rejected(errorMock, "", userMock);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      error: errorMessageMock,
      loading: "failed",
    });
  });

  it("return undefined error and status loading is pending for refresh token", () => {
    const action = postToken.pending("", "token");
    expect(authReducer(undefined, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("return undefined error and status loading is fulfilled for refresh token", () => {
    const action = postToken.fulfilled("", "token", "newToken");
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      loading: "succeeded",
    });
  });

  it('return error message "Error" and status loading is failed for refresh token', () => {
    const action = postToken.rejected(errorMock, "", null);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      error: errorMessageMock,
      loading: "failed",
    });
  });

  it("return undefined error and status loading is pending for logout", () => {
    const action = postLogout.pending("", null);
    expect(authReducer(undefined, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("return undefined error and status loading is fulfilled for logout", () => {
    const action = postLogout.fulfilled("", "", null);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      loading: "succeeded",
    });
  });

  it('return error message "Error" and status loading is failed for logout', () => {
    const action = postLogout.rejected(errorMock, "", null);
    expect(authReducer(initialAuthState, action)).toStrictEqual({
      error: errorMessageMock,
      loading: "failed",
    });
  });
});
