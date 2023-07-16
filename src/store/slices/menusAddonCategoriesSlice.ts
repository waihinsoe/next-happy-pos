import { config } from "@/config/config";
import type {
  menus_addon_categories as MenuAddonCategory,
  menus as Menu,
} from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchMenusAddonCategories = createAsyncThunk(
  "menusAddonCategoriesSlice/fetchMenusAddonCategories",
  async (menus: Menu[], thunkAPI) => {
    const menuIds = menus.map((item) => item.id);
    if (!menuIds.length) return;
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusAddonCategories?menuIds=${menuIds}`
    );
    if (response.ok) {
      const menusAddonCategories =
        (await response.json()) as MenuAddonCategory[];
      thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
      thunkAPI.dispatch(setIsLoading(false));
    } else {
      thunkAPI.dispatch(setIsLoading(false));
    }
  }
);

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMenusAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories, setIsLoading } =
  menusAddonCategoriesSlice.actions;
export default menusAddonCategoriesSlice.reducer;
