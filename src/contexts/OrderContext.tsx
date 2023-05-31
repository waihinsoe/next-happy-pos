import { createContext, useEffect, useState } from "react";
import {
  Addon,
  AddonCategory,
  Company,
  Location,
  Menu,
  MenuCategory,
  MenuMenuCategoryLocation,
  Order,
} from "../typings/types";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
  cart: Order | null;
}

export const defaultOrderContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
  cart: null,
};

export const OrderContext =
  createContext<OrderContextType>(defaultOrderContext);

const OrderProvider = (props: any) => {
  const [data, updateData] = useState(defaultOrderContext);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    const response = await fetch(`${config.orderApiBaseUrl}/?locationId=25`);
    const responseJson = await response.json();
    updateData({ ...data, ...responseJson });
  };
  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
