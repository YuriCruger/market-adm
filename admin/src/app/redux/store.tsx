"use client";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import dataSlice from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    data: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
