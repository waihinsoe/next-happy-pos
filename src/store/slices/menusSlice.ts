import type { menus as Menu } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusState {
  isLoading: boolean;
  menus: Menu[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: true,
  menus: [],
  error: null,
};

export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = menusSlice.actions;

export default menusSlice.reducer;
