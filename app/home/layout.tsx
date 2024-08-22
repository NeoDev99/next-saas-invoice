"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
