"use client";

import { useState, useEffect, type FormEvent } from "react";
import { App, Button, Col, Input, Row, Space, Form } from "antd";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createProductAsync, updateProductAsync } from "@/features/products/productThunks";
import { selectProductsLoading } from "@/features/products/productSelectors";
import type { Product } from "@/features/products/productTypes";

type ProductFormProps = {
  editingProduct: Product | null;
  onCancelEdit: () => void;
  onEditDone: () => void;
};

export default function ProductForm({
  editingProduct,
  onCancelEdit,
  onEditDone,
}: ProductFormProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductsLoading);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const isEditMode = Boolean(editingProduct);
  const { message } = App.useApp();


  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(String(editingProduct.price));
      setDescription(editingProduct.description);
    }
  }, [editingProduct]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !price.trim()) return;

    try {
      if (editingProduct) {
        await dispatch(
          updateProductAsync({
            id: editingProduct.id,
            data: {
              name: name.trim(),
              description: description.trim(),
              price: Number(price),
            },
          })
        ).unwrap();

        message.success("Product updated successfully");
        onEditDone();
      } else {
        await dispatch(
          createProductAsync({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
          })
        ).unwrap();

        message.success("Product created successfully");
      }

      setName("");
      setPrice("");
      setDescription("");
    } catch {
      message.error(
        editingProduct
          ? "Failed to update product"
          : "Failed to create product"
      );
    }
  }
  function handleCancel() {
    setName("");
    setPrice("");
    setDescription("");
    onCancelEdit();
  }

  return (
    <Row justify="center" style={{ marginBottom: 24 }}>
      <Col xs={24} md={12} lg={8}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 12 }}
          />

           <Input
            placeholder="Category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          <Input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          <Space style={{ width: "100%" }} orientation="vertical">
            <Button type="primary" htmlType="submit" loading={loading} block>
              {isEditMode ? "Update Product" : "Add Product"}
            </Button>

            {isEditMode && (
              <Button onClick={handleCancel} block>
                Cancel Edit
              </Button>
            )}
          </Space>
        </form>
      </Col>
    </Row>
  );
}