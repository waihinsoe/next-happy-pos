import type { orderLines as OrderLine } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface OrderLinesState {
  isLoading: boolean;
  orderlines: OrderLine[];
  error: Error | null;
}

const initialState: OrderLinesState = {
  isLoading: true,
  orderlines: [],
  error: null,
};

export const orderLinesSlice = createSlice({
  name: "orderLines",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = orderLinesSlice.actions;
export default orderLinesSlice.reducer;
