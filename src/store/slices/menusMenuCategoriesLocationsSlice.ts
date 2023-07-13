import type { menus_menu_categories_locations as MenuMenuCategoryLocation } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface MenusMenuCategoriesLocationsState {
  isLoading: boolean;
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesLocationsState = {
  isLoading: true,
  menusMenuCategoriesLocations: [],
  error: null,
};

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = menusMenuCategoriesLocationsSlice.actions;
export default menusMenuCategoriesLocationsSlice.reducer;
