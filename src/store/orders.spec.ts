import { orderMock, ordersDataMock } from "../utils/mocks";
import { clearOrderError } from "./orderSlice";
import {
  clearOrdersData,
  initialOrdersState,
  ordersReducer,
  setOrdersData,
  setViewOrder,
  wsClose,
  wsInit,
  wsOpen,
} from "./ordersSlice";

describe("Test reducer for Orders", () => {
  it("return the initial state Orders Data", () => {
    expect(
      ordersReducer({ ...initialOrdersState }, { type: undefined })
    ).toEqual({
      ...initialOrdersState,
    });
  });

  it("return state soket url", () => {
    const socketUrl = "wss://mock.com";
    expect(ordersReducer({ ...initialOrdersState }, wsInit(socketUrl))).toEqual(
      {
        ...initialOrdersState,
        socketUrl: socketUrl,
      }
    );
  });

  it("return state soket close", () => {
    expect(ordersReducer({ ...initialOrdersState }, wsClose())).toEqual({
      ...initialOrdersState,
      socket: false,
      ordersData: null,
    });
  });

  it("return state soket open", () => {
    expect(ordersReducer({ ...initialOrdersState }, wsOpen())).toEqual({
      ...initialOrdersState,
      socket: true,
    });
  });

  it("return state orders error", () => {
    expect(ordersReducer({ ...initialOrdersState }, clearOrderError())).toEqual(
      {
        ...initialOrdersState,
        error: undefined,
      }
    );
  });

  it("return state orders data", () => {
    expect(
      ordersReducer(
        { ...initialOrdersState },
        setOrdersData({ ...ordersDataMock })
      )
    ).toEqual({
      ...initialOrdersState,
      ordersData: { ...ordersDataMock },
    });
  });

  it("return state orders data null", () => {
    expect(
      ordersReducer(
        { ...initialOrdersState, ordersData: { ...ordersDataMock } },
        clearOrdersData()
      )
    ).toEqual({
      ...initialOrdersState,
      ordersData: null,
    });
  });

  it("return state view order data", () => {
    expect(
      ordersReducer({ ...initialOrdersState }, setViewOrder({ ...orderMock }))
    ).toEqual({
      ...initialOrdersState,
      viewOrder: { ...orderMock },
    });
  });
});
