"use client";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import dataSlice from "./slices/dataSlice";
import rowSlice from "./slices/rowSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    data: dataSlice,
    row: rowSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
