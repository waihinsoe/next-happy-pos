import type { tables as Table } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TablesState {
  isLoading: boolean;
  items: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items = [...state.items, action.payload];
    },
    removeTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateTable: (state, action: PayloadAction<Table>) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    },
  },
});

export const { setTables, addTable, removeTable, updateTable } =
  tablesSlice.actions;
export default tablesSlice.reducer;
