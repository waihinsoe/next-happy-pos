import { config } from "@/config/config";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
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

export const selectMenus = (state: RootState) => state.menus.items;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectaddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderLines = (state: RootState) => state.orderLines.items;
export const selectTables = (state: RootState) => state.tables.items;
export const selectCompany = (state: RootState) => state.company.item;

export const appData = createSelector(
  [
    selectMenus,
    selectMenuCategories,
    selectaddons,
    selectAddonCategories,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectLocations,
    selectOrders,
    selectOrderLines,
    selectTables,
    selectCompany,
  ],
  (
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
    company
  ) => {
    // do something with a, b, and c, and return a result
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
  }
);

export default appSlice.reducer;
