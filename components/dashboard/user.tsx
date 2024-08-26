"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, UserPen, Settings2 } from "lucide-react";

export function User() {
    const { user, isSignedIn } = useUser(); // Use useUser hook to get user data
    const { signOut } = useClerk(); // Use useClerk to handle sign out

    // Use a state to manage the user image URL
    const [userImage, setUserImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (user && user.imageUrl) {
            setUserImage(user.imageUrl);
        }
    }, [user]);

    const handleSignOut = () => {
        signOut(); // Call signOut function from Clerk
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    {userImage ? (
                        <Image
                            src={userImage}
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-gray-200"></div> // Placeholder if no image
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Settings2 className="h-4 w-4 mr-3" /> Settings
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <UserPen className="h-4 w-4 mr-3" /> Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {isSignedIn ? (
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-3" /> Sign Out
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem>
                        <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
