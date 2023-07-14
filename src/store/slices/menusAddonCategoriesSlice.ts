import type { menus_addon_categories as MenuAddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusAddonCategoriesState {
  isLoading: boolean;
  items: MenuAddonCategory[];
  error: Error | null;
}

const initialState: MenusAddonCategoriesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories } = menusAddonCategoriesSlice.actions;
export default menusAddonCategoriesSlice.reducer;
