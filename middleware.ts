import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ru'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass logic for static assets, root-level public files, and blog
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/_next/image/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/locales/') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/apple-touch-icon.png') ||
    pathname.startsWith('/icon.png') ||
    pathname.startsWith('/icon-192.png') ||
    pathname.startsWith('/icon-512.png') ||
    pathname.startsWith('/.well-known/') ||
    /^\/[^/]+\.[^/]+$/.test(pathname)
  ) {
    console.log(`Middleware: Bypassing localization for path: ${pathname}`);
    return NextResponse.next();
  }

  console.log(`Middleware: Processing localization for path: ${pathname}`);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    console.log(`Middleware: Pathname already has locale: ${pathname}`);
    return NextResponse.next();
  }

  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const preferredLocale = localeCookie && locales.includes(localeCookie) ? localeCookie : defaultLocale;
  console.log(`Middleware: Preferred locale: ${preferredLocale}`);

  let newPathWithLocale;
  if (pathname === '/') {
    newPathWithLocale = `/${preferredLocale}`;
  } else {
    newPathWithLocale = `/${preferredLocale}${pathname}`;
  }
  
  request.nextUrl.pathname = newPathWithLocale;
  
  console.log(`Middleware: Redirecting to: ${request.nextUrl.toString()}`);
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
      // Add \\.well-known to the negative lookahead
      // The \\ is to escape the dot . so it's treated as a literal dot.
      '/((?!api|_next/static|_next/image|favicon.ico|images|locales|\\.well-known).*)',
    ],
  };