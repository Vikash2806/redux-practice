import type { RootState } from "@/redux/store";

// 🔹 Get all products
export const selectProducts = (state: RootState) =>
  state.products.items;

// 🔹 Get loading state
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;

// 🔹 Get error state
export const selectProductsError = (state: RootState) =>
  state.products.error;