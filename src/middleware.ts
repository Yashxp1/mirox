import NextAuth from 'next-auth';
import authconfig from './lib/authconfig';
import { authRoute, privateRoute } from './route';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authconfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const url = req.nextUrl.origin;

  const isProtectedRoute = privateRoute.includes(nextUrl.pathname);

  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  const isApiRoute = nextUrl.pathname.includes('/api');

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', url));
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
