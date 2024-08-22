"use client";

import React from 'react';
import { useUser } from "@clerk/nextjs";
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import invoiceImage from "@/public/images/demo.webp"

const HomePage = () => {
    const { user } = useUser(); // Fetches user data

	if (!user) return <div>Loading...</div>;

	// Determine the name to display
	const displayName = user.fullName || user.firstName || user.username || 'User';

    return (
        <section className="section min-h-screen bg-gradient-to-r from-green-100 to-teal-400 dark:from-gray-900 dark:to-violet-400">
            <div className="grid grid-cols-1 md:grid-cols-2 py-16 px-16 text-gray-900 items-center gap-6">
                <div className="flex flex-col space-y-4 items-start dark:text-white">
                    <h1 className="text-4xl font-bold">Welcome to SaaS Invoice <span className="text-blue-600">{displayName}!</span></h1>
                    <p className="text-base md:text-xl">Create, Manage, and Track Invoices. <br/>Download as PDF, Email and Print Invoices</p>
                    <Link
                        href="/dashboard"
                        className="flex items-center rounded py-2 px-4 bg-violet-700 text-white"
                    >
                        Create Invoice
                        <ArrowDown className="h-3 w-4 ml-2" />
                    </Link>
                </div>

                <div className="flex justify-center items-center">
                <Image
                    src={invoiceImage}
                    alt="Invoice preview"
                    className="rounded shadow-lg"
                    width={500}
                    height={300}
                />
                </div>
            </div>
        </section>
    );
};

export default HomePage;
