import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ✅ Create and Export Axios Instance
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures Laravel Sanctum authentication works
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ TypeScript Interface for Items
export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

// ✅ Get all items
export async function getItems(): Promise<Item[]> {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

// ✅ Create an item
export async function createItem(data: Omit<Item, "id">) {
  try {
    const response = await api.post("/items", data);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

// ✅ Update an item
export async function updateItem(id: number, data: Partial<Item>) {
  try {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

// ✅ Delete an item
export async function deleteItem(id: number) {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
