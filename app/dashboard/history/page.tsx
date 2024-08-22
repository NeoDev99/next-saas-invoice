"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PlusCircle, View } from "lucide-react";
import { Button } from "@/components/ui/button";
  
export default function HistoryPage() {
  const { isLoaded, isSignedIn, user } = useUser();
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const fetchInvoices = useCallback(async () => {
		try {
			const res = await fetch(`/api/invoices?userID=${user?.id}`);
			const data = await res.json();
			setInvoices(data.invoices);

		} catch (err) {
			console.error(err);
		}

	}, [user]);

	useEffect(() => {
		fetchInvoices();
	}, [fetchInvoices]);

	if (!isSignedIn || !isLoaded) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		);

	}

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>View all your invoices and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? invoices.map((invoice) => (
          <div className='bg-blue-50 w-full mb-3 rounded-md p-3 flex items-center justify-between' key={invoice.id}>
            <div>
              <p className='text-sm text-gray-500 mb-2'>
                Invoice - #0{invoice.id} issued to{" "}
                <span className='font-bold'>{invoice.customer_id}</span>
              </p>
              <h3 className='text-lg font-bold mb-[1px]'>{Number(invoice.total_amount).toLocaleString()}</h3>
            </div>
            <Link href={{
              pathname: `/dashboard/invoices/${invoice.id}`,
              query: { customer: invoice.customer_id },
            }} className=''>
              <Button size="lg" className="bg-gray-900 text-white rounded gap-2">
                <View className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Preview
                </span>
              </Button>
            </Link>
          </div>
        )) : (
          <p className='text-lg text-red-500'>No invoices found</p>
        )}
      </CardContent>
    </Card>
  );
};