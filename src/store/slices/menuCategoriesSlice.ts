import type { menu_categories as MenuCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenuCategoriesState {
  isLoading: boolean;
  menuCategories: MenuCategory[];
  error: Error | null;
}

const initialState: MenuCategoriesState = {
  isLoading: true,
  menuCategories: [],
  error: null,
};

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
