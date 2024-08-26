"use client";

import React from 'react';
import DesktopNav from '@/components/layout/DesktopNav';
import { SearchInput } from '@/components/dashboard/search';
import DashboardBreadCrumb from '@/components/dashboard/DashboardBreadcrumb';
import Providers from '@/components/dashboard/providers';
import MobileNav from '@/components/layout/MobileNav';
import { User } from '@/components/dashboard/user';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <main className="flex flex-col bg-muted/40">
                <DesktopNav />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-[#f9fbfd]">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav />
                        <DashboardBreadCrumb />
                        <SearchInput />
                        <User />
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40 min-h-screen">
                        {children}
                    </main>
                </div>
            </main>
        </Providers>
    );
}
