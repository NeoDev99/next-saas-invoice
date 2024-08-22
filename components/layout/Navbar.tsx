"use client"

import React from 'react';
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeToggle from '@/components/ui/theme-toggle';

const Navbar = () => {
    return (
        <header className='flex justify-between items-center h-[10vh] px-8 border-b-[1px] dark:border-none dark:bg-gray-900'>
            <Link href='/' className='text-2xl font-extrabold text-gray-900 dark:text-white'>
                SaaS <span className='text-teal-400'>Invoicer</span>
            </Link>

            <nav className="flex items-center gap-5">
                <Link href='/features'>Features</Link>
                <Link href='/pricing'>Pricing</Link>
                {/* If user is signed in, show dashboard */}
                <SignedIn>
                    <Link href='/dashboard'>
                        Dashboard
                    </Link>
                </SignedIn>
            </nav>

            <div className='flex items-center gap-3'>
                {/* If user is signed out */}
                <SignedOut>
                    <button className='rounded w-20 py-1 bg-teal-400 text-white font-semibold'>
                        <SignInButton mode='modal'/>
                    </button>
                </SignedOut>

                {/* If user is signed in, show user button */}
                <SignedIn>
                    <div className="bg-blue-50 rounded-full p-1">
                        <UserButton showName />
                    </div>
                </SignedIn>

                {/* Theme toggle icon */}
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Navbar;
