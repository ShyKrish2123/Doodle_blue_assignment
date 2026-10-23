import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    incrementFunction(state, action) {
      state.count += action.payload;
    },
    decrementFunction(state, action) {
      state.count -= action.payload;
    }
  }
});

export const CounterActions = counterSlice.actions;
export default counterSlice;