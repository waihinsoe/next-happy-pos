import { createContext, useEffect, useState } from "react";
import type {
  addons as Addon,
  addon_categories as AddonCategory,
  companies as Company,
  locations as Location,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenuMenuCategoryLocation,
  menus_addon_categories as MenuAddonCategory,
  tables as Table,
  orders as Order,
  orderLines as OrderLine,
} from "@prisma/client";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface BackOfficeContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusAddonCategories: MenuAddonCategory[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  isLoading: boolean;
  company: Company | null;
  tables: Table[];
  orders: Order[];
  orderLines: OrderLine[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultBackOfficeContext: BackOfficeContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusAddonCategories: [],
  menusMenuCategoriesLocations: [],
  company: null,
  isLoading: true,
  tables: [],
  orders: [],
  orderLines: [],
  updateData: () => {},
  fetchData: () => {},
};

export const BackOfficeContext = createContext<BackOfficeContextType>(
  defaultBackOfficeContext
);

const BackOfficeProvider = (props: any) => {
  const [data, updateData] = useState(defaultBackOfficeContext);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    const response = await fetch(`${config.backOfficeApiBaseUrl}`);
    const responseJson = await response.json();

    if (response.ok) {
      updateData({ ...data, ...responseJson, isLoading: false });
    }
  };
  return (
    <BackOfficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackOfficeContext.Provider>
  );
};

export default BackOfficeProvider;
