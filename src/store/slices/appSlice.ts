import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddons } from "./addonsSlice";
import { setMenus } from "./menusSlice";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocationsSlice";
import { setLocations } from "./locationsSlice";
import { setOrders } from "./ordersSlice";
import { setOrderLines } from "./orderLinesSlice";
import { setTables } from "./tablesSlice";
import { setCompany } from "./companySlice";
import { RootState } from "..";

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
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${locationId}`
    );

    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      locations,
      orders,
      orderLines,
      tables,
      company,
    } = responseJson;

    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderLines(orderLines));
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setCompany(company));
    thunkAPI.dispatch(setAppLoading(false));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;

export const appData = (state: RootState) => {
  const menus = state.menus.items;
  const menuCategories = state.menuCategories.items;
  const addons = state.addons.items;
  const addonCategories = state.addonCategories.items;
  const menusAddonCategories = state.menusAddonCategories.items;
  const menusMenuCategoriesLocations = state.menusMenuCategoriesLocations.items;
  const locations = state.locations.items;
  const orders = state.orders.items;
  const orderLines = state.orderLines.items;
  const tables = state.tables.items;
  const company = state.company.item;

  return {
    menus,
    menuCategories,
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    locations,
    orders,
    orderLines,
    tables,
    company,
  };
};

export default appSlice.reducer;
