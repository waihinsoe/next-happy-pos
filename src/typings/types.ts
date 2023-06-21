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
  id: number;
  isPaid: boolean;
  tableId: number;
  orderLines: OrderLine[];
}
