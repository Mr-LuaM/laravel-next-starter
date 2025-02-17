import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, logout, getUser } from "@/lib/auth"; // ✅ Ensure correct imports

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      setError("Invalid email or password.");
      return false;
    }

    router.push("/dashboard");
    return true;
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return { handleLogin, handleLogout, loading, error, getUser };
};
