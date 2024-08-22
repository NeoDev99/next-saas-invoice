"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, History, SquarePen, Users2, Settings } from "lucide-react";
import useActiveLink from "@/hooks/useActiveLink"; // Active Link custom hook

import logo from "/public/logo.svg";

function DesktopNav() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r dark:bg-gray-900 text-gray-400 sm:flex">
            <nav className="flex flex-col items-center gap-6 px-2 sm:py-5">
                <Link
                    href="/home"
                    className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image
                        src={logo}
                        alt="Acme Inc"
                        className="h-5 w-5 transition-all group-hover:scale-110"
                        width={240}
                        height={240}
                    />
                    <span className="sr-only">Invoicer</span>
                </Link>

                <Link
                    href="/dashboard"
                    className={`px-4 py-2 hover:text-black dark:hover:text-white ${
                        useActiveLink("/dashboard") ? "text-black dark:text-white" : ""
                    }`}
                >
                    <Home className="h-5 w-5" />
                </Link>

                <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-4"></div>

                <Link
                    href="/dashboard/invoices"
                    className={`hover:text-black dark:hover:text-white ${
                        useActiveLink("/dashboard/invoices") ? "text-black dark:text-white" : ""
                    }`}
                >
                    <SquarePen className="h-5 w-5" />
                </Link>

                <Link
                    href="/dashboard/customers"
                    className={`hover:text-black dark:hover:text-white ${
                        useActiveLink("/dashboard/customers") ? "text-black dark:text-white" : ""
                    }`}
                >
                    <Users2 className="h-5 w-5" />
                </Link>

                <Link
                    href="/dashboard/history"
                    className={`hover:text-black dark:hover:text-white ${
                        useActiveLink("/dashboard/history") ? "text-black dark:text-white" : ""
                    }`}
                >
                    <History className="h-5 w-5" />
                </Link>
            </nav>

            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>

                <Link
                    href="/dashboard/settings"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg hover:text-black dark:hover:text-white md:h-8 md:w-8 ${
                        useActiveLink("/dashboard/settings") ? "text-black dark:text-white" : ""
                    }`}
                >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Link>
            </nav>
        </aside>
    );
}

export default DesktopNav;
