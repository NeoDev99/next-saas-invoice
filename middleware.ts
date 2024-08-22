import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const protectedRoutes = createRouteMatcher([
    "/customers",
    "/settings",
    "/dashboard",
    "/history",
    "/invoices(.*)",
]);

// Define routes that should not be protected
const unprotectedRoutes = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    // Add any other routes that should not be protected
]);

export default clerkMiddleware((auth, req) => {
    // Allow unprotected routes to pass through
    if (unprotectedRoutes(req)) {
        return;
    }
    
    // Protect other routes
    if (protectedRoutes(req)) {
        auth().protect();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
