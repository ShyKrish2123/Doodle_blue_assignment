import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice/slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  },
});
