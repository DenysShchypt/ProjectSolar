import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
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
