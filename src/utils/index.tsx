import { config } from "@/config/config";
import { CartItem } from "@/typings/types";
import { Box, Typography } from "@mui/material";
import type {
  menus as Menu,
  locations as Location,
  menus_menu_categories_locations as MenuMenuCategoryLocation,
  menus_addon_categories as MenuAddonCategory,
  addon_categories as AddonCategory,
  addons as Addon,
  orderLines as OrderLine,
  orders as Order,
  menu_categories as MenuCategory,
  tables as Table,
} from "@prisma/client";
export const getAccessToken = () => {
  if (typeof window === "undefined") return "";
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getSelectedLocationId = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("selectedLocation");
};

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderAppUrl}/?locationId=${locationId}&tableId=${tableId}`;
};

export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[],
  menuCategoryId: string,
  selectedLocationId: string
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id &&
        item.locations_id === Number(selectedLocationId) &&
        item.menu_categories_id === Number(menuCategoryId)
    )
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getLocationsByMenuCategoryId = (
  locations: Location[],
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[],
  menuCategoryId: string
) => {
  const locationIds = [
    ...new Set(
      menusMenuCategoriesLocations
        .filter((item) => item.menu_categories_id === Number(menuCategoryId))
        .map((item) => item.locations_id)
    ),
  ];
  return locations.filter((item) => locationIds.includes(item.id));
};

export const getAddonCategoriesByMenuId = (
  menusAddonCategories: MenuAddonCategory[],
  menuId: string,
  addonCategories: AddonCategory[]
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menus_id === Number(menuId))
    .map((item) => item.addon_categories_id);

  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getAddonsByLocationId = (
  menusMenuCategoriesLocations: MenuMenuCategoryLocation[],
  menusAddonCategories: MenuAddonCategory[],
  addons: Addon[]
) => {
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id) as number[];

  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_categories_id as number)
  );
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://res.cloudinary.com/dnhwkmskb/image/upload/v1705941273/happy-pos/qrcode/locationId-${locationId}-tableId-${tableId}.png`;
  // return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/wai-hin-soe/locationId-${locationId}-tableId-${tableId}.png`;
};

export const getNumberOfMenusByOrderId = (
  orderId: number,
  orderLines: OrderLine[]
) => {
  const validOrderLines = orderLines.filter(
    (orderLine) => orderLine.orders_id === orderId
  );

  let menuIds: number[] = [];
  validOrderLines.forEach((item) => {
    const hasAdded = menuIds.find((menuId) => menuId === item.menus_id);
    if (!hasAdded) return menuIds.push(item.menus_id);
  });

  return menuIds.length;
};

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const totalAddonPrice = curr.addons.reduce(
      (addonPrice, addon) => addonPrice + addon.price,
      0
    );
    prev += (menuPrice + totalAddonPrice) * curr.quantity;
    return prev;
  }, 0);
  return totalPrice;
};

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);

export const getMenuByMenuId = (menus: Menu[], menuId: number) =>
  menus.find((menu) => menu.id === menuId);

export const getAddonByAddonId = (addons: Addon[], addonId: number) =>
  addons.find((addon) => addon.id === addonId);

export const renderAddons = (addons: Addon[]) => {
  if (!addons.length) return;
  return (
    <Box sx={{ pl: 6 }}>
      {addons.map((addon) => {
        return (
          <Box
            key={addon.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
              {addon.name}
            </Typography>
            <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
              {addon.price}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export const getOrdersByLocationIdAndTableId = (
  orders: Order[],
  selectedLocationId: string,
  tableId: string
) => {
  return orders.filter(
    (order) =>
      order.locations_id === Number(selectedLocationId) &&
      order.tables_id === Number(tableId)
  );
};

export const sorting = (
  items: any,
  // | Menu[]
  // | Addon[]
  // | AddonCategory[]
  // | MenuCategory[]
  // | Table[]
  // | Location[],
  status: string
) => {
  const copiedItems = items.slice(); //for read-only error

  if (status === "time") {
    return copiedItems.sort(
      (a: { updatedAt: Date }, b: { updatedAt: Date }) => {
        const dataA = new Date(a.updatedAt);
        const dataB = new Date(b.updatedAt);
        return dataB.getTime() - dataA.getTime();
      }
    );
  } else if (status === "id") {
    return copiedItems.sort(
      (a: { id: number }, b: { id: number }) => a.id - b.id
    );
  } else if (status === "A-Z") {
    return copiedItems.sort((a: { name: string }, b: { name: string }) => {
      const nameA = a.name.toLowerCase(); // Convert to lowercase for case-insensitive sorting
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB); // Sort alphabetically from A to Z
    });
  }
  return [];
};

export const searching = (
  items: any,
  // | Menu[]
  // | Addon[]
  // | AddonCategory[]
  // | MenuCategory[]
  // | Table[]
  // | Location[],
  keyword: string
) => {
  if (keyword.length === 0) return items;
  return items.filter((item: { name: string }) =>
    item.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );
};
