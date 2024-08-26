"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { History, Home, PanelLeft, Settings, SquarePen, Users2 } from 'lucide-react';

import logo from "/public/images/logo.svg";

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-xs bg-white">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/home"
                        className="flex items-center gap-4 px-2.5 pt-8 text-muted-foreground hover:text-foreground"
                    >
                        <Image
                            src={logo}
                            alt="SaaS Invoice"
                            className="h-5 w-5 transition-all group-hover:scale-150"
                            width={240}
                            height={240}
                        />
                        <span className="">Home</span>
                    </Link>

                    <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-2"></div>

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/invoices"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <SquarePen className="h-5 w-5" />
                        Invoices
                    </Link>
                    <Link
                        href="/dashboard/customers"
                        className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                        <Users2 className="h-5 w-5" />
                        Customers
                    </Link>
                    <Link
                        href="/dashboard/history"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <History className="h-5 w-5" />
                        History
                    </Link>

                    <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>

                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>
            </SheetContent>
      </Sheet>
    );
}

export default MobileNav;