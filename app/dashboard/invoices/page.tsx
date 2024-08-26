"use client";

import InvoiceTable from "@/components/dashboard/InvoiceTable";
import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Invoice() {
    const { user } = useUser();
    const [itemList, setItemList] = useState<Item[]>([]);
    const [customer, setCustomer] = useState<string>("");
    const [invoiceTitle, setInvoiceTitle] = useState<string>("");
    const [itemCost, setItemCost] = useState<number>(1);
    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const [itemName, setItemName] = useState<string>("");
    const [customers, setCustomers] = useState([]);
    const router = useRouter();

    const fetchCustomers = useCallback(async () => {
        try {
            const res = await fetch(`/api/customers?userID=${user?.id}`);
            const data = await res.json();
            setCustomers(data.customers);
        } catch (err) {
            console.log(err);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchCustomers();
        }
    }, [fetchCustomers, user]);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
            setItemList([
                ...itemList,
                {
                    id: Math.random().toString(36).substring(2, 9),
                    name: itemName,
                    cost: itemCost,
                    quantity: itemQuantity,
                    price: itemCost * itemQuantity,
                },
            ]);
        }

        setItemName("");
        setItemCost(0);
        setItemQuantity(0);
    };

    const getTotalAmount = () => {
        let total = 0;
        itemList.forEach((item) => {
            total += item.price;
        });
        return total;
    };

    const createInvoice = async () => {
        try {
            const res = await fetch("/api/invoices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer,
                    title: invoiceTitle,
                    items: itemList,
                    total: getTotalAmount(),
                    ownerID: user?.id,
                }),
            });
            const data = await res.json();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message
            });
            router.push("/dashboard/history");
        } catch (err) {
            console.log(err);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!customer || !invoiceTitle || !itemList.length || itemName) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill all fields'
            });
            return;
        }
        createInvoice();
    };

    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Invoice</CardTitle>
                    <CardDescription>View all your invoices and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='w-full flex flex-col' onSubmit={handleFormSubmit}>
                        <Label htmlFor='customer'>Customer</Label>
                        {customers.length > 0 ? (
                            <select
                                className='border-[1px] p-2 rounded-sm mb-3'
                                required
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                            >
                                {customers.map((customer: any) => (
                                    <option key={customer.id} value={customer.name}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className='text-sm text-red-500'>No customers found. Please add a customer</p>
                        )}

                        <Label htmlFor='title'>Title</Label>
                        <input
                            className='border-[1px] rounded-sm mb-3 py-2 px-3'
                            required
                            value={invoiceTitle}
                            onChange={(e) => setInvoiceTitle(e.target.value)}
                        />

                        <div className='flex flex-col gap-4'>
                            <h3 className='mt-4 font-bold'>Items List</h3>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-col flex-1'>
                                    <label htmlFor='itemName' className='text-sm mb-1'>Name</label>
                                    <Input
                                        type='text'
                                        name='itemName'
                                        placeholder='Name'
                                        className='py-2 px-4 bg-gray-100'
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <label htmlFor='itemCost' className='text-sm mb-1'>Cost</label>
                                    <input
                                        type='number'
                                        name='itemCost'
                                        placeholder='Cost'
                                        className='py-2 px-4 bg-gray-100'
                                        value={itemCost}
                                        onChange={(e) => setItemCost(Number(e.target.value))}
                                    />
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <label htmlFor='itemQuantity' className='text-sm mb-1'>Quantity</label>
                                    <input
                                        type='number'
                                        name='itemQuantity'
                                        placeholder='Quantity'
                                        className='py-2 px-4 bg-gray-100'
                                        value={itemQuantity}
                                        onChange={(e) => setItemQuantity(Number(e.target.value))}
                                    />
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <label htmlFor='itemPrice' className='text-sm mb-1'>Price</label>
                                    <p className='py-2 px-4 bg-gray-100'>
                                        {Number(itemCost * itemQuantity).toLocaleString("en-US")}
                                    </p>
                                </div>
                            </div>
                            <Button size="lg" onClick={handleAddItem} className='bg-gray-900 text-white h-8 gap-2'>
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Item
                                </span>
                            </Button>
                        </div>

                        <InvoiceTable itemList={itemList} />

                        <Button size="sm" type="submit" className="bg-gray-900 p-3 text-white mt-4 h-8 gap-2">
                            <Save className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                SAVE & PREVIEW INVOICE
                            </span>
                        </Button>
                        
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
