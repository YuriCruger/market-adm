"use client";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export const userSlice = createSlice({
  name: "data",
  initialState: {
    value: {} as User,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
