import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except for static files and _next
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Match all /api routes except for /api/socket/io and /api/uploadthing
    '/api/((?!socket/io|uploadthing).*)',
    // Match all /trpc routes
    '/trpc/(.*)',
  ],
};