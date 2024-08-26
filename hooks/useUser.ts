import { useUser as useClerkUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

type UserType = {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
};

export function useUser() {
    const { isLoaded, isSignedIn, user } = useClerkUser();
    const [userData, setUserData] = useState<UserType | null>(null);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            setUserData({
                fullName: user.fullName ?? undefined,
                firstName: user.firstName ?? undefined,
                lastName: user.lastName ?? undefined,
                username: user.username ?? undefined,
                email: user.emailAddresses[0]?.emailAddress ?? undefined,
            });
        } else {
            setUserData(null);
        }
    }, [isLoaded, isSignedIn, user]);

    return { isLoaded, isSignedIn, user: userData };
}
