import type { addon_categories as AddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonCategoriesState {
  isLoading: boolean;
  items: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isLoading: true,
  items: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = [...state.items, action.payload];
    },
    removeAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategory,
  removeAddonCategory,
  updateAddonCategory,
} = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
