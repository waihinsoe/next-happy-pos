import type { menus as Menu, addons as Addon } from "@prisma/client";

export interface CartItem {
  id: string;
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
