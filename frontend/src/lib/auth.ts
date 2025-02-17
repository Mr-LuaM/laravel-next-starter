import { api } from "./api";

// ✅ Login function using Laravel Passport API
export const login = async (email: string, password: string) => {
  try {
    // ✅ Send credentials to Laravel API
    const res = await api.post("/login", { email, password });

    if (res.status === 200) {
      const token = res.data.token; // ✅ Extract JWT token
      localStorage.setItem("token", token); // ✅ Store token in localStorage
      return true;
    }

    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// ✅ Logout function (Remove token & notify backend)
export const logout = async () => {
  try {
    await api.post("/logout", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    localStorage.removeItem("token"); // ✅ Remove token from storage
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// ✅ Get authenticated user (Ensures JWT is attached)
export const getUser = async () => {
  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
