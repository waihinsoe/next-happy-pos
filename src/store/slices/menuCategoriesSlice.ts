import type { menu_categories as MenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuCategoriesState {
  isLoading: boolean;
  items: MenuCategory[];
  error: Error | null;
}

const initialState: MenuCategoriesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {
  setMenuCategories,
  addMenuCategory,
  removeMenuCategory,
  updateMenuCategory,
} = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
