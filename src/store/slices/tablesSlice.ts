import type { tables as Table } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface TablesState {
  isLoading: boolean;
  tables: Table[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: true,
  tables: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = tablesSlice.actions;
export default tablesSlice.reducer;
