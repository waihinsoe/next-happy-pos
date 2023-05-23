import { createContext, useEffect, useState } from "react";
import {
  Addon,
  AddonCategory,
  Company,
  Location,
  Menu,
  MenuCategory,
  MenuLocation,
} from "../typings/types";
import { config } from "../config/config";
import { getAccessToken } from "@/utils";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusLocations: [],
  company: null,

  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = getAccessToken();

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchData();
  //     console.log(defaultContext);
  //   }
  // }, [accessToken]);

  useEffect(() => {
    updateData({
      ...data,
      locations: [
        { id: 1, name: "indaw", address: "innywar", companies_id: 12 },
      ],
    });
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    updateData({ ...data, ...responseJson });
  };
  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
