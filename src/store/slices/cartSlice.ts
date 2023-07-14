import { CartItem } from "@/typings/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}

const initialState: CartState = {
  isLoading: true,
  items: [],
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = cartSlice.actions;

export default cartSlice.reducer;
