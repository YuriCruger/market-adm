import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/dbTypes";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: [],
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
