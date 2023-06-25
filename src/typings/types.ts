import type { menus as Menu, addons as Addon } from "@prisma/client";

export interface OrderLine {
  menu: Menu;
  addons: Addon[];
  quantity: number;
}
