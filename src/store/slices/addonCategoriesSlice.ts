import type { addon_categories as AddonCategory } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface AddonCategoriesState {
  isLoading: boolean;
  addonCategories: AddonCategory[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isLoading: true,
  addonCategories: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
