import {
  headerNavReducer,
  initialHeaderNavState,
  setActiveLink,
} from "./headerSlice";

describe("Test reducer for Header Navigation", () => {
  it("return the initial state Header Navigation", () => {
    expect(
      headerNavReducer({ ...initialHeaderNavState }, { type: undefined })
    ).toEqual({
      ...initialHeaderNavState,
    });
  });

  it("return the state with active link profile", () => {
    expect(
      headerNavReducer({ ...initialHeaderNavState }, setActiveLink("profile"))
    ).toEqual({
      activeLink: "profile",
    });
  });

  it("return the state with active link feed", () => {
    expect(
      headerNavReducer({ ...initialHeaderNavState }, setActiveLink("feed"))
    ).toEqual({
      activeLink: "feed",
    });
  });
});
