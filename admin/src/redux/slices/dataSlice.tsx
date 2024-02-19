import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export interface DataState {
  value: DocumentData[];
}

const initialState: DataState = {
  value: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DocumentData[]>) => {
      state.value = action.payload;
    },
    addProduct: (state, action: PayloadAction<DocumentData>) => {
      state.value.push(action.payload);
    },
    removeProducts: (state, action: PayloadAction<DocumentData[]>) => {
      state.value = state.value.filter((product) => {
        return !action.payload.some(
          (removeProduct) => product.id === removeProduct.id,
        );
      });
    },
  },
});

export const { setData, removeProducts, addProduct } = dataSlice.actions;
export default dataSlice.reducer;
