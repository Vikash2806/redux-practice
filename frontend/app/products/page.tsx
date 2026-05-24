"use client";

import { useEffect, useState } from "react";
import { App, Flex, Spin, Typography } from "antd";

import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/features/products/productThunks";
import {
  selectProductsError,
  selectProductsLoading,
} from "@/features/products/productSelectors";

import type { Product } from "@/features/products/productTypes";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <App>
    <main>
      <Flex justify="center">
        <Typography.Title level={1}>{editingProduct ? "Edit Product" : "Products Page"}</Typography.Title>
      </Flex>

      <ProductForm
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
        onEditDone={() => setEditingProduct(null)}
      />

      {loading ? (
        <Flex justify="center">
          <Spin />
        </Flex>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <ProductList onEdit={setEditingProduct} />
      )}
    </main>
    </App>
  );
}