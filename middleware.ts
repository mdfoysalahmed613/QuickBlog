import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// Middleware runs only for the paths in `config.matcher` (see bottom).
export async function middleware(request: NextRequest) {
   // Example: Redirect to login if not authenticated
   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
   const { pathname } = request.nextUrl;
   if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
     return NextResponse.redirect(new URL('/', request.url));
   }
   if (!token) {
     return NextResponse.redirect(new URL('/login', request.url));
   }
}

export const config = {
  // Only run middleware for these paths — keeps middleware from firing on every request
  matcher: [ '/admin/:path*'],
};
