import type { menu_categories as MenuCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setMenuCategories } = menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
