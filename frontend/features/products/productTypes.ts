// 🔹 Product type (full data from backend)
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

// 🔹 Payload for creating product
export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
};

// 🔹 Payload for updating product
export type UpdateProductPayload = {
  id: string;
  data: Partial<Omit<Product, "id">>;
};