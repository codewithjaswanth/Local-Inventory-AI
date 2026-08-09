import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes requiring authentication
  const protectedPrefixes = ['/admin', '/dashboard', '/shopkeeper', '/profile', '/orders', '/checkout'];
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtectedRoute) {
    // Check for Supabase session token in cookies or auth header
    const token =
      request.cookies.get('sb-access-token')?.value ||
      request.cookies.get('supabase-auth-token')?.value;

    // Also check for standard auth token header
    const authHeader = request.headers.get('authorization');

    // If no token present, redirect to login page with redirect param
    if (!token && !authHeader) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/shopkeeper/:path*',
    '/profile',
    '/orders',
    '/checkout',
  ],
};
