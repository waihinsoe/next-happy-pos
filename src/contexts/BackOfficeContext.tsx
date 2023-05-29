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
import { useSession } from "next-auth/react";

interface BackOfficeContextType {
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

export const defaultBackOfficeContext: BackOfficeContextType = {
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
