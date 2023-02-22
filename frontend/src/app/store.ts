import {configureStore} from "@reduxjs/toolkit";
import {executorReducer} from "../store/executorSlice";

export const store = configureStore({
  reducer: {
    executor: executorReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;