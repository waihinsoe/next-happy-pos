import type { locations as Location } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationsState {
  isLoading: boolean;
  items: Location[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: true,
  items: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.items = [...state.items, action.payload];
    },
    removeLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setLocations, addLocation, removeLocation, updateLocation } =
  locationsSlice.actions;

export default locationsSlice.reducer;
