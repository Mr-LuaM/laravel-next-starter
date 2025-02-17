import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ✅ Get all items
export async function getItems() {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

// ✅ Create item
export async function createItem(data: { name: string; description?: string }) {
  try {
    const response = await api.post("/items", data);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

// ✅ Update item
export async function updateItem(id: number, data: { name?: string; description?: string }) {
  try {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

// ✅ DELETE item (This was missing!)
export async function deleteItem(id: number) {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
