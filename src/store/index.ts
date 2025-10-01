import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { authApi } from "./api/authApi";
import { contentApi } from "./api/ContentApi";
import { quizApi } from "./api/QuizApi";
import { academyApi } from "./api/Academy";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [academyApi.reducerPath]: academyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(contentApi.middleware)
      .concat(quizApi.middleware)
      .concat(academyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
