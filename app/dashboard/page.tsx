"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from "@/components/dashboard/Loading";

export default function Dashboard() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [bankInfoExists, setBankInfoExists] = useState<boolean>(false);
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);

	const fetchBankInfo = useCallback(async () => {
		try {
			const response = await fetch(`/api/bank-info?userID=${user?.id}`);
			const data = await response.json();
			if (data?.bankInfo[0]) {
				setBankInfoExists(true);
			}
		} catch (err) {
			console.error(err);
		}
	}, [user]);

  // Fetch total number of invoices
  const fetchTotalInvoices = useCallback(async () => {
    try {
      const response = await fetch(`/api/invoices?userID=${user?.id}`);
      const data = await response.json();
      // Count the number of invoices in the response
      setTotalInvoices(data.invoices.length);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  // Fetch total number of customers
  const fetchTotalCustomers = useCallback(async () => {
    try {
      const response = await fetch(`/api/customers?userID=${user?.id}`);
      const data = await response.json();
      // Check the structure of the response
      console.log(data); // Add this line to inspect the response structure
      // Adjust based on the actual response structure
      setTotalCustomers(data.customers.length); // Ensure `data.customers` is the correct path
    } catch (err) {
      console.error(err);
    }
  }, [user]);


	useEffect(() => {
		if (user) {
			fetchBankInfo();
      fetchTotalInvoices();
    }
  }, [fetchBankInfo, fetchTotalInvoices, fetchTotalCustomers, user]);

	if (!isLoaded || !isSignedIn) {
    return <Loading />;
  }

  // Determine the name to display
	const displayName = user.fullName || user.firstName || user.username || 'User';

	return (
    <section>
      <Card>
        {!bankInfoExists ? (
          <div>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Welcome, <span className='text-blue-700 font-bold'>{displayName}</span>! Please add a bank info to start using the application!</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href='/dashboard/settings'>
                <Button size="sm" className="bg-gray-900 p-3 text-white mt-4 h-8 gap-2">
                <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Bank Info
                  </span>
                </Button>
              </Link>
            </CardContent>          
          </div>
        ) : (
          <div>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Welcome to your dashboard, <span className='text-blue-700 font-bold'>{displayName}</span>! Manage your invoices, customers, and settings here.</CardDescription>
            </CardHeader>
            <CardContent>
              
              {/** Dashboard Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Invoices Created</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-5xl font-bold">
                    <span className="mr-2">+</span>{totalInvoices}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Customers</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-5xl font-bold">
                    <span className="mr-2">+</span>{totalCustomers}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg rounded-md">
                <CardHeader>
                    <CardTitle className="text-lg font-medium">Other Info</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-5xl font-bold">
                    {/* Add relevant info here */}
                  </CardContent>
                </Card>
              </div>

              <Link href='/dashboard/invoices'>
                <Button size="sm" className="bg-gray-900 p-3 text-white mt-4 h-8 gap-2">
                <SquarePen className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create New Invoice
                  </span>
                </Button>
              </Link>
            </CardContent>         
          </div>
        )}
      </Card>
    </section>
	);
}
