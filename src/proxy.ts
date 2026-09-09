import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === '/' || pathname.startsWith('/auth');

  if (isPublicRoute && sessionCookie) {
    // Check if valid session
    try {
      const payload = await decrypt(sessionCookie);
      if (payload) {
        return NextResponse.redirect(new URL('/app/dashboard', request.url));
      }
    } catch (e) {
      // invalid session, ignore
    }
  }

  if (!isPublicRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (!isPublicRoute && sessionCookie) {
    try {
      await decrypt(sessionCookie);
    } catch (e) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
