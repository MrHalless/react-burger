import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { socketMiddleware } from "./socketMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([socketMiddleware]),
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
