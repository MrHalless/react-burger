import {
  initialMenuProfileState,
  menuProfileReducer,
  setActiveMenuProfileItem,
} from "./menuProfileSlice";

describe("Test reducer for Menu Profile", () => {
  it("return the initial state Menu Profile", () => {
    expect(
      menuProfileReducer({ ...initialMenuProfileState }, { type: undefined })
    ).toEqual({
      ...initialMenuProfileState,
    });
  });

  it("return the state with active link profile", () => {
    expect(
      menuProfileReducer(
        { ...initialMenuProfileState },
        setActiveMenuProfileItem("profile")
      )
    ).toEqual({
      activeItem: "profile",
    });
  });

  it("return the state with active link orders", () => {
    expect(
      menuProfileReducer(
        { ...initialMenuProfileState },
        setActiveMenuProfileItem("orders")
      )
    ).toEqual({
      activeItem: "orders",
    });
  });

  it("return the state with active link logout", () => {
    expect(
      menuProfileReducer(
        { ...initialMenuProfileState },
        setActiveMenuProfileItem("logout")
      )
    ).toEqual({
      activeItem: "logout",
    });
  });
});
