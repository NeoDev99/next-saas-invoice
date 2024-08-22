/*
"use client";

import React from 'react';
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const DashboardPage = () => {
  const { user } = useUser();

	if (!user) return <div>Loading...</div>;

	// Determine the name to display
	const displayName = user.fullName || user.firstName || user.username || 'User';

  return (
    <section>
      <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Welcome to your dashboard, <span className='text-blue-700 font-bold'>{displayName}</span>! Manage your invoices, customers, and settings here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href='/dashboard/settings'
              className='bg-black p-3 text-red-50 rounded-md'
            >
              Add Bank Info
            </Link>
          </CardContent>
      </Card>
    </section>
  );
};

export default DashboardPage;
*/


"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [bankInfoExists, setBankInfoExists] = useState<boolean>(false);

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

	useEffect(() => {
		if (user) {
			fetchBankInfo();
		}
	}, [fetchBankInfo, user]);

	if (!isLoaded || !isSignedIn) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		);
	}

	return (
    <section>
      <Card>
        {!bankInfoExists ? (
          <div>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Welcome, <span className='text-blue-700 font-bold'>(displayName)</span>! Please add a bank info to start using the application!</CardDescription>
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
              <CardDescription>Welcome to your dashboard, <span className='text-blue-700 font-bold'>(displayName)</span>! Manage your invoices, customers, and settings here.</CardDescription>
            </CardHeader>
            <CardContent>
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
