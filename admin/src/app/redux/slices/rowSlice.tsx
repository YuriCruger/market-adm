import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Row } from "@tanstack/react-table";
import { DocumentData } from "firebase/firestore";

export interface RowState {
  value: Row<DocumentData>[];
}

const initialStateRow: RowState = {
  value: [],
};

export const rowSlice = createSlice({
  name: "row",
  initialState: initialStateRow,
  reducers: {
    setRowSelection: (state, action: PayloadAction<Row<DocumentData>>) => {
      state.value.push(action.payload);
    },
    removeRowSelection: (state) => {
      state.value = [];
    },
  },
});
export default rowSlice.reducer;
export const { setRowSelection, removeRowSelection } = rowSlice.actions;
