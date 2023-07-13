import type { orders as Order } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  isLoading: boolean;
  orders: Order[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: true,
  orders: [],
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = ordersSlice.actions;
export default ordersSlice.reducer;
