import type { menus_menu_categories_locations as MenuMenuCategoryLocation } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusMenuCategoriesLocationsState {
  isLoading: boolean;
  items: MenuMenuCategoryLocation[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesLocationsState = {
  isLoading: true,
  items: [],
  error: null,
};

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setMenusMenuCategoriesLocations: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations } =
  menusMenuCategoriesLocationsSlice.actions;
export default menusMenuCategoriesLocationsSlice.reducer;
