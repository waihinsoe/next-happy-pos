import type { addons as Addon } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonsState {
  isLoading: boolean;
  items: Addon[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: true,
  items: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.items = [...state.items, action.payload];
    },
    removeAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateAddon: (state, action: PayloadAction<Addon>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setAddons, addAddon, removeAddon, updateAddon } =
  addonsSlice.actions;

export default addonsSlice.reducer;
