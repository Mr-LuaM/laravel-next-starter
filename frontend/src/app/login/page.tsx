"use client";

import { useState } from "react"; // ✅ Import useState
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

const onSubmit = async (data: any) => {
    setLoading(true);
    const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
    });
    setLoading(false);

    if (res?.ok) {
        router.push("/dashboard");
    } else {
        alert("Invalid login credentials");
    }
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
                            <Input {...register("email")} type="email" placeholder="Enter your email" className="w-full mt-1"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Input {...register("password")} type="password" placeholder="Enter your password" className="w-full mt-1"/>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white" disabled={loading}>
    {loading ? "Logging in..." : "Login"}
</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
