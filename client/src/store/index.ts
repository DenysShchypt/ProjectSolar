import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./slice/auth";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "payload.headers",
          "payload.config",
          "payload.request",
          "payload.config.transformRequest",
          "payload.config.transformResponse",
        ],
        ignoredPaths: ["auth.token", "auth.user"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
