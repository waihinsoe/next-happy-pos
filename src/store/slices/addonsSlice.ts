import type { addons as Addon } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface AddonsState {
  isLoading: boolean;
  addons: Addon[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: true,
  addons: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.addons = action.payload;
    },
  },
});

export const { setAddons } = addonsSlice.actions;

export default addonsSlice.reducer;
