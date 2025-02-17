"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" }, // ✅ Prevents uncontrolled component errors
  });

  const { handleLogin, loading, error } = useAuth(); // ✅ Ensure correct function name
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const success = await handleLogin(data.email, data.password);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[400px] shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1"
                autoFocus // ✅ Improves UX
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
