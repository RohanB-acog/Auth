// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-chars-long!!!'
);

interface SessionUser {
  userId: string;
  isAdmin: boolean;
}

async function getSessionFromCookie(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    if (!token) return null;

    const verified = await jwtVerify(token, secret);
    return verified.payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Get current path
  const path = request.nextUrl.pathname;
  
  // Define path types
  const isAuthPage = path === '/';
  const isAdminPath = path.startsWith('/admin');
  const isProtectedPath = path.startsWith('/dashboard') || 
                         path.startsWith('/profile');

  // Get session
  const session = await getSessionFromCookie(request);

  // Handle authentication page (login page)
  if (isAuthPage) {
    if (session?.userId) {
      // Redirect based on user role stored in JWT
      const redirectPath = session.isAdmin ? '/admin' : '/dashboard';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    return NextResponse.next();
  }

  // Handle no session for protected routes
  if (!session?.userId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle admin routes
  if (isAdminPath && !session.isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Add user info to headers for use in the application
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.userId);
  requestHeaders.set('x-user-role', session.isAdmin ? 'admin' : 'user');

  // Continue with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/',
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};