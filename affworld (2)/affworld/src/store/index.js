import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "../reducers";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // reducer: {
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  // auth: authReducer,
  // }
});

const persistor = persistStore(store);

export { store, persistor };
