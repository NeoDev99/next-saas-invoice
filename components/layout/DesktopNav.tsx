"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, History, SquarePen, Users2, Settings } from "lucide-react";
import { NavItem } from "../dashboard/nav-item";

import logo from "/public/images/logo.svg";

function DesktopNav() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white dark:bg-gray-900 text-gray-400 sm:flex">
            <nav className="flex flex-col items-center gap-5 px-2 sm:py-5">
                <Link
                    href="/home"
                    className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image
                        src={logo}
                        alt="SaaS Invoice"
                        className="h-5 w-5 transition-all group-hover:scale-150"
                        width={240}
                        height={240}
                    />
                    <span className="sr-only">Invoicer</span>
                </Link>

                <NavItem href="/dashboard" label="Dashboard">
                    <Home className="h-5 w-5" />
                </NavItem>

                <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-2"></div>

                <NavItem href="/dashboard/invoices" label="Invoices">
                    <SquarePen className="h-5 w-5" />
                </NavItem>

                <NavItem href="/dashboard/customers" label="Customers">
                    <Users2 className="h-5 w-5" />
                </NavItem>
             
                <NavItem href="/dashboard/history" label="History">
                    <History className="h-5 w-5" />
                </NavItem>

            </nav>

            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>

                <NavItem href="/dashboard/settings" label="Settings">
                    <Settings className="h-5 w-5" />
                </NavItem>
            </nav>
        </aside>
    );
}

export default DesktopNav;
