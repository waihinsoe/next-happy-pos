import { configureStore } from "@reduxjs/toolkit";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import appSlice from "./slices/appSlice";
import cartSlice from "./slices/cartSlice";
import companySlice from "./slices/companySlice";
import locationsSlice from "./slices/locationsSlice";
import menusSlice from "./slices/menusSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocationsSlice";
import ordersSlice from "./slices/ordersSlice";
import orderLinesSlice from "./slices/orderLinesSlice";
import tablesSlice from "./slices/tablesSlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";
import orderAppSlice from "./slices/orderAppSlice";
// ...

export const store = configureStore({
  reducer: {
    orderApp: orderAppSlice,
    app: appSlice,
    menuCategories: menuCategoriesSlice,
    menus: menusSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    addonCategories: addonCategoriesSlice,
    addons: addonsSlice,
    locations: locationsSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    cart: cartSlice,
    orders: ordersSlice,
    orderLines: orderLinesSlice,
    tables: tablesSlice,
    company: companySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
