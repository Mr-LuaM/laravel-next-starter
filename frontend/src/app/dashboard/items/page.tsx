"use client";

import { useEffect, useState } from "react";
import { getItems, deleteItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ItemsPage() {
    const [items, setItems] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await getItems();
            setItems(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure?")) {
            await deleteItem(id);
            setItems(items.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Items</h1>
                <Button onClick={() => router.push("/dashboard/items/create")} className="bg-primary text-white">
                    + Add Item
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4">₱{item.price}</td>
                                <td className="py-3 px-4">{item.quantity}</td>
                                <td className="py-3 px-4 text-center space-x-2">
                                    <Button onClick={() => router.push(`/dashboard/items/${item.id}/edit`)} className="bg-blue-500 text-white">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
