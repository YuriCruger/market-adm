import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/dbTypes";

export interface DataState {
  value: Product[];
}

const initialState: DataState = {
  value: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Product[]>) => {
      state.value = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
    removeProducts: (state, action: PayloadAction<Product[]>) => {
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
