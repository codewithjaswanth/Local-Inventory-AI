import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  // Protected route check
  const isProtectedPath =
    path.startsWith('/dashboard') ||
    path.startsWith('/admin') ||
    path.startsWith('/shopkeeper');

  // In production with Supabase Auth active, cookie check happens here
  const supabaseAuthToken = req.cookies.get('sb-access-token')?.value || req.cookies.get('sb-refresh-token')?.value;

  // If visiting protected route without token (and auth enforced)
  if (isProtectedPath && process.env.ENFORCE_SUPABASE_AUTH === 'true' && !supabaseAuthToken) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/shopkeeper/:path*'],
};
