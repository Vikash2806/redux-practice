import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/features/products/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

console.log("Redux Store:"); // Debugging line to check the store state

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;