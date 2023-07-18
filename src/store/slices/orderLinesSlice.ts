import { config } from "@/config/config";
import type { orderLines as OrderLine, orders as Order } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchOrderLines = createAsyncThunk(
  "orderLinesSlice/fetchOrderLines",
  async (orders: Order[], thunkAPI) => {
    const orderIds = orders.map((item) => item.id);
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/orderLines?orderIds=${orderIds}`
    );
    const orderLines = (await response.json()) as OrderLine[];
    thunkAPI.dispatch(setOrderLines(orderLines));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export const orderLinesSlice = createSlice({
  name: "orderLines",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOrderLines: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setOrderLines, setIsLoading } = orderLinesSlice.actions;
export default orderLinesSlice.reducer;
