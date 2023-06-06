// interface BaseType {
//   id?: number;
//   name: string;
// }

// export interface Menu extends BaseType {
//   asset_url?: string;
//   price: number;
//   description: string;
//   menuCategoryIds: number[];
//   isAvailable?: boolean;
// }

// export interface MenuCategory extends BaseType {}

// export interface Addon extends BaseType {
//   price: number;
//   addonCategoriesId: number;
// }

// export interface AddonCategory extends BaseType {
//   isRequired: boolean;
// }

// export interface Location extends BaseType {
//   companies_id: number;
//   address: string;
// }

// export interface MenuMenuCategoryLocation extends BaseType {
//   menus_id: number;
//   locations_id: number;
//   menu_categories_id: number;
//   is_available: boolean;
// }

// export interface Company {
//   id?: number;
//   name: string;
//   address: string;
// }

import type { menus as Menu, addons as Addon } from "@prisma/client";
export enum OrderLineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}

export interface OrderLine {
  menu: Menu;
  addons?: Addon[];
  quantity: number;
  status: OrderLineStatus;
}

export interface Order {
  id?: number;
  isPaid: boolean;
  tableId: number;
  orderLines: OrderLine[];
}
