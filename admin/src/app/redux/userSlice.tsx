import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const storedUserString = localStorage.getItem("@market/userClient");
const initialState =
  typeof storedUserString === "string" ? JSON.parse(storedUserString) : {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState as User,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
