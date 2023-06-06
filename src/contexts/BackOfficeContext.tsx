import { createContext, useEffect, useState } from "react";
// import {
//   Addon,
//   AddonCategory,
//   Company,
//   Location,
//   Menu,
//   MenuCategory,
//   MenuMenuCategoryLocation,
// } from "../typings/types";
import type {
  addons as Addon,
  addon_categories as AddonCategory,
  companies as Company,
  locations as Location,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenuMenuCategoryLocation,
} from "@prisma/client";
import { config } from "../config/config";
import { useSession } from "next-auth/react";

interface BackOfficeContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[];
  isLoading: boolean;
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultBackOfficeContext: BackOfficeContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  company: null,
  isLoading: false,
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
    updateData({ ...data, ...responseJson });
  };
  return (
    <BackOfficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackOfficeContext.Provider>
  );
};

export default BackOfficeProvider;
