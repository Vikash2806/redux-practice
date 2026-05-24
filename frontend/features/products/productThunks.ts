import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/services/productApi";

import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "./productTypes";

// GET /api/products
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

// GET /api/products/:id
export const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchProductById",
  async (id) => {
    return await getProductById(id);
  }
);

// POST /api/products
export const createProductAsync = createAsyncThunk<
  Product,
  CreateProductPayload
>("products/createProduct", async (payload) => {
  return await createProduct(payload);
});

// PUT /api/products/:id
export const updateProductAsync = createAsyncThunk<
  Product,
  UpdateProductPayload
>("products/updateProduct", async ({ id, data }) => {
  return await updateProduct(id, data);
});

// DELETE /api/products/:id
export const deleteProductAsync = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);