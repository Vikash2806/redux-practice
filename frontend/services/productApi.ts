import type { Product } from "@/features/products/productTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

// 🔹 GET all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    headers: {
      "Authorization": 'null--void',
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// 🔹 GET single product
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      "Authorization": 'null--void',
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

// 🔹 POST create product
export async function createProduct(
  payload: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'null--void',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
}

// 🔹 PUT update product
export async function updateProduct(
  id: string,
  payload: Partial<Product>
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'null--void',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}

// 🔹 DELETE product
export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": 'null--void',
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
}