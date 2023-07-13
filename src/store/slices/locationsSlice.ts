import type { locations as Location } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface LocationsState {
  isLoading: boolean;
  locations: Location[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: true,
  locations: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = locationsSlice.actions;

export default locationsSlice.reducer;
