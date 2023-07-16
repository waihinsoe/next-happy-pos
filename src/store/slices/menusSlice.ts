import type { menus as Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenusState {
  isLoading: boolean;
  items: Menu[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: true,
  items: [],
  error: null,
};

export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateMenu: (state, action: PayloadAction<Menu>) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    },
  },
});

export const { setMenus, addMenu, removeMenu, updateMenu } = menusSlice.actions;

export default menusSlice.reducer;
