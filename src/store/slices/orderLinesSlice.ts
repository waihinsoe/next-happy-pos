import type { orderLines as OrderLine } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface OrderLinesState {
  isLoading: boolean;
  items: OrderLine[];
  error: Error | null;
}

const initialState: OrderLinesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const orderLinesSlice = createSlice({
  name: "orderLines",
  initialState,
  reducers: {
    setOrderLines: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setOrderLines } = orderLinesSlice.actions;
export default orderLinesSlice.reducer;
