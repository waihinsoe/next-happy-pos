import { config } from "@/config/config";
import type {
  menus_menu_categories_locations as MenuMenuCategoryLocation,
  locations as Location,
} from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchMenusMenuCategoriesLocations = createAsyncThunk(
  "menusMenuCategoriesLocationsSlice/fetchMenusMenuCategoriesLocations",
  async (locations: Location[], thunkAPI) => {
    const locationIds = locations.map((item) => item.id);
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations?locationIds=${locationIds}`
    );
    const menusMenuCategoriesLocations =
      (await response.json()) as MenuMenuCategoryLocation[];
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenuMenuCategoryLocation[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations, setIsLoading } =
  menusMenuCategoriesLocationsSlice.actions;
export default menusMenuCategoriesLocationsSlice.reducer;
