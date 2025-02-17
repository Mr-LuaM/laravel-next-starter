import { signIn, signOut } from "next-auth/react";
import { api } from "./api"; // ✅ Correctly imported API instance

// ✅ Login Function
export const login = async (email: string, password: string) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) throw new Error("Invalid email or password.");
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// ✅ Logout Function
export const logout = async () => {
  try {
    await api.post("/logout");
    await signOut();
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// ✅ Get Authenticated User
export const getUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
