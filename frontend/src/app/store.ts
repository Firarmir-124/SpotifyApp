import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {executorReducer} from "../store/executorSlice";
import {userReducer} from "../store/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {trackHistoryReducer} from "../store/trackHistorySlice";
import {controlExecutorReducer} from "../store/controlExecutorSlice";

const userPersistConfig = {
  key: 'spotify:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  executor: executorReducer,
  users: persistReducer(userPersistConfig, userReducer),
  trackHistory: trackHistoryReducer,
  controlExecutor: controlExecutorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;