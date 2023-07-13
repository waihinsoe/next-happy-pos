import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddons } from "./addonsSlice";

interface AppState {
  isLoading: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isLoading: true,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (locationId: string, thunkAPI) => {
    const response = await fetch(
      `${config.orderApiBaseUrl}?locationId=${locationId}`
    );

    const responseJson = await response.json();
    const {
      locations,
      menus,
      menuCategories,
      addons,
      menusAddonCategories,
      addonCategories,
      menusMenuCategoriesLocations,
      orders,
      orderLines,
    } = responseJson;

    thunkAPI.dispatch(setAddons(addons));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
