"use client";

import { useState } from "react";
import { createItem } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ Import toast
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateItemPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });
    const [loading, setLoading] = useState(false); // ✅ Add loading state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await createItem({
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                quantity: parseInt(form.quantity),
            });

            toast.success("Item created successfully!"); // ✅ Show success toast
            router.push("/dashboard/items");
        } catch (error) {
            toast.error("Failed to create item!"); // ✅ Show error toast
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Create Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input name="name" placeholder="Item Name" onChange={handleChange} required />
                        <Input name="description" placeholder="Description" onChange={handleChange} />
                        <Input name="price" type="number" placeholder="Price" onChange={handleChange} required />
                        <Input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
                        <Button type="submit" className="w-full bg-primary text-white" disabled={loading}>
                            {loading ? "Creating..." : "Create Item"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
