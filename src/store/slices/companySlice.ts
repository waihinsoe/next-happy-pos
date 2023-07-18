import type { companies as Company } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface CompanyState {
  isLoading: boolean;
  item: Company | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: true,
  item: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.item = action.payload;
    },
    updateCompany: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setCompany, updateCompany } = companySlice.actions;

export default companySlice.reducer;
