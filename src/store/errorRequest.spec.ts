import { errorMessageMock } from "../utils/mocks";
import {
  clearError,
  errorRequestReducer,
  initialErrorRequestState,
  setError,
} from "./errorRequestSlice";

describe("Test reducer for Error App Modal", () => {
  it("return the initial state Error App", () => {
    expect(
      errorRequestReducer({ ...initialErrorRequestState }, { type: undefined })
    ).toEqual({
      ...initialErrorRequestState,
    });
  });

  it("return the state with error message and open error modal", () => {
    expect(
      errorRequestReducer(
        { ...initialErrorRequestState },
        setError(errorMessageMock)
      )
    ).toEqual({
      message: errorMessageMock,
      isError: true,
    });
  });

  it("return the state with empty error message and close error modal", () => {
    expect(
      errorRequestReducer(
        { message: errorMessageMock, isError: true },
        clearError()
      )
    ).toEqual({
      message: "",
      isError: false,
    });
  });
});
