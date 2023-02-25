import {configureStore} from "@reduxjs/toolkit";
import {executorReducer} from "../store/executorSlice";
import {userReducer} from "../store/userSlice";

export const store = configureStore({
  reducer: {
    executor: executorReducer,
    users: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;