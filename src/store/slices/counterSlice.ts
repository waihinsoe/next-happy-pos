import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";
import { config } from "@/config/config";

// Define a type for the slice state
interface CounterState {
  isLoading: boolean;
  value: number;
  data: any;
}

// Define the initial state using that type
const initialState: CounterState = {
  isLoading: false,
  value: 0,
  data: {},
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const response = await fetch(`${config.orderApiBaseUrl}?locationId=17`);
    const responseJson = await response.json();
    return responseJson;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchContent.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
