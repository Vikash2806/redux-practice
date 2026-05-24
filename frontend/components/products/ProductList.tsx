"use client";

import { Input, Table, Row, Col, Empty } from "antd";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectProducts } from "@/features/products/productSelectors";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks";
import { deleteProductAsync } from "@/features/products/productThunks";
import type { Product } from "@/features/products/productTypes";

type ProductListProps = {
  onEdit: (product: Product) => void;
};

export default function ProductList({ onEdit }: ProductListProps) {
  // 🔹 Get products from Redux
  const products = useAppSelector(selectProducts);

  const [search, setSearch] = useState("");

  // Delete Products
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteProductAsync(id));
  }


  // 🔹 Filter logic
  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <div style={{ display: "flex", gap: 12 }}>
    <EditOutlined
      onClick={() => onEdit(record)}
    />
    <DeleteOutlined
      onClick={() => handleDelete(record.id)}
      style={{ color: "red", cursor: "pointer" }}
    />
  </div>
      ),
    },
  ];


  if (products.length === 0) {
  return (
    <Row justify="center" style={{ marginTop: 40}}>
      <Col>
        <Empty
          image="/images/emptyState3.webp"
          styles={{
            image: {
              width: 550,
              height: 350,
            },
          }}
          description="No products available"
        />
      </Col>
    </Row>
  );
}

  return (
    <Row justify="center">
      <Col xs={24} md={12} lg={8}>
        {/* 🔹 Search input */}
        <Input
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        {/* 🔹 Table */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={false}
        />
      </Col>
    </Row>
  );
}
