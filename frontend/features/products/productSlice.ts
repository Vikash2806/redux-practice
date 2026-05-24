import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productTypes";

import {
  fetchProducts,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
} from "./productThunks";

type ProductState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 GET all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      })

      // 🔹 CREATE product
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // 🔹 UPDATE product
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // 🔹 DELETE product
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;