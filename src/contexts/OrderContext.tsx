import { createContext, useEffect, useState } from "react";
import { CartItem } from "../typings/types";
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
  orderLines as DbOrderLine,
} from "@prisma/client";
import { config } from "../config/config";
import { useRouter } from "next/router";

interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  company: Company | null;
  isLoading: boolean;
  updateData: (value: any) => void;
  fetchData: () => void;
  orders: Order[];
  orderLines: DbOrderLine[];
  cart: CartItem[];
}

export const defaultOrderContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  company: null,
  isLoading: true,
  updateData: () => {},
  fetchData: () => {},
  orders: [],
  orderLines: [],
  cart: [],
};

export const OrderContext =
  createContext<OrderContextType>(defaultOrderContext);

const OrderProvider = (props: any) => {
  const router = useRouter();
  const query = router.query;
  const locationId = query.locationId;
  const [data, updateData] = useState(defaultOrderContext);
  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  const fetchData = async () => {
    if (!locationId) return;
    updateData({ ...data, isLoading: true });
    const response = await fetch(
      `${config.orderApiBaseUrl}/?locationId=${locationId}`
    );
    if (response.ok) {
      const responseJson = await response.json();
      updateData({ ...data, ...responseJson, isLoading: false });
    }
  };
  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
