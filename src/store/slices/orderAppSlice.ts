import { config } from "@/config/config";
import { CartItem } from "@/typings/types";
import type {
  addons as Addon,
  addon_categories as AddonCategory,
  companies as Company,
  locations as Location,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenuMenuCategoryLocation,
  menus_addon_categories as MenuAddonCategory,
  orders as Order,
  orderLines as OrderLines,
} from "@prisma/client";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";

interface OrderAppState {
  isLoading: boolean;
  company: Company | null;
  locations: Location[];
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  orders: Order[];
  orderLines: OrderLines[];
  cart: CartItem[];
  error: Error | null;
}

const initialState: OrderAppState = {
  isLoading: true,
  company: null,
  locations: [],
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCategories: [],
  menusMenuCategoriesLocations: [],
  orders: [],
  orderLines: [],
  cart: [],
  error: null,
};

export const fetchOrderAppData = createAsyncThunk(
  "orderAppSlice/fetchOrderAppData",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setOrderAppLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/order?locationId=${locationId}`
    );
    if (response.ok) {
      const orderAppData = await response.json();
      thunkAPI.dispatch(setOrderAppData(orderAppData));
      // thunkAPI.dispatch(setOrderAppLoading(false));
    }
  }
);

const orderAppSlice = createSlice({
  name: "orderApp",
  initialState,
  reducers: {
    setOrderAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOrderAppData: (state, action) => {
      state.company = action.payload.company;
      state.locations = action.payload.locations;
      state.menus = action.payload.menus;
      state.menuCategories = action.payload.menuCategories;
      state.addons = action.payload.addons;
      state.menusAddonCategories = action.payload.menusAddonCategories;
      state.addonCategories = action.payload.addonCategories;
      state.menusMenuCategoriesLocations =
        action.payload.menusMenuCategoriesLocations;
      state.orders = action.payload.orders;
      state.orderLines = action.payload.orderLines;
      state.isLoading = false;
    },
    setCartItem: (state, action) => {
      state.cart = action.payload;
    },
    addCartItem: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    updateCartItem: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

const selectCompany = (state: RootState) => state.orderApp.company;
const selectLocations = (state: RootState) => state.orderApp.locations;
const selectMenus = (state: RootState) => state.orderApp.menus;
const selectMenuCategories = (state: RootState) =>
  state.orderApp.menuCategories;
const selectAddons = (state: RootState) => state.orderApp.addons;
const selectAddonCategories = (state: RootState) =>
  state.orderApp.addonCategories;
const selectMenusAddonCategories = (state: RootState) =>
  state.orderApp.menusAddonCategories;
const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.orderApp.menusMenuCategoriesLocations;
const selectOrders = (state: RootState) => state.orderApp.orders;
const selectOrderLines = (state: RootState) => state.orderApp.orderLines;
const selectCart = (state: RootState) => state.orderApp.cart;
const selectIsLoading = (state: RootState) => state.orderApp.isLoading;

export const orderAppData = createSelector(
  [
    selectCompany,
    selectLocations,
    selectMenus,
    selectMenuCategories,
    selectAddons,
    selectAddonCategories,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectOrders,
    selectOrderLines,
    selectCart,
    selectIsLoading,
  ],
  (
    company,
    locations,
    menus,
    menuCategories,
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    orders,
    orderLines,
    cart,
    isLoading
  ) => {
    return {
      company,
      locations,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      orders,
      orderLines,
      cart,
      isLoading,
    };
  }
);

// export const orderAppData = (state: RootState) => {
//   const company = state.orderApp.company;
//   const locations = state.orderApp.locations;
//   const menus = state.orderApp.menus;
//   const menuCategories = state.orderApp.menuCategories;
//   const addons = state.orderApp.addons;
//   const addonCategories = state.orderApp.addonCategories;
//   const menusAddonCategories = state.orderApp.menusAddonCategories;
//   const menusMenuCategoriesLocations =
//     state.orderApp.menusMenuCategoriesLocations;
//   const orders = state.orderApp.orders;
//   const orderLines = state.orderApp.orderLines;
//   const cart = state.orderApp.cart;
//   const isLoading = state.orderApp.isLoading;
//   return {
//     company,
//     locations,
//     menus,
//     menuCategories,
//     addons,
//     addonCategories,
//     menusAddonCategories,
//     menusMenuCategoriesLocations,
//     orders,
//     orderLines,
//     cart,
//     isLoading,
//   };
// };

export const {
  setCartItem,
  setOrderAppLoading,
  setOrderAppData,
  addCartItem,
  updateCartItem,
  removeCartItem,
} = orderAppSlice.actions;
export default orderAppSlice.reducer;
