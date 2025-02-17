"use client";

import { useEffect, useState } from "react";
import { getItems, updateItem } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditItemPage() {
    const router = useRouter();
    const { id } = useParams();
    const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });

    useEffect(() => {
        async function fetchItem() {
            const item = await getItems();
            const selectedItem = item.find((i: any) => i.id === parseInt(id));
            if (selectedItem) setForm(selectedItem);
        }
        fetchItem();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateItem(parseInt(id), {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            quantity: parseInt(form.quantity),
        });
        router.push("/dashboard/items");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Edit Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input name="name" value={form.name} onChange={handleChange} required />
                        <Input name="description" value={form.description} onChange={handleChange} />
                        <Input name="price" type="number" value={form.price} onChange={handleChange} required />
                        <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
                        <Button type="submit" className="w-full bg-primary text-white">
                            Update Item
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
