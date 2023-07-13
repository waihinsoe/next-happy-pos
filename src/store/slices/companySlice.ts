import type { companies as Company } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface CompanyState {
  isLoading: boolean;
  company: Company | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: true,
  company: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    exampleAction: (state) => state,
  },
});

export const { exampleAction } = companySlice.actions;

export default companySlice.reducer;
