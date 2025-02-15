import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const updatedSearchParams = new URLSearchParams();
  let needsRedirect = false;

  searchParams.forEach((value, key) => {
    if (value.endsWith('/')) {
      updatedSearchParams.set(key, value.slice(0, -1));
      needsRedirect = true;
    } else {
      updatedSearchParams.set(key, value);
    }
  });

  if (needsRedirect) {
    request.nextUrl.search = updatedSearchParams.toString();
    return NextResponse.redirect(request.nextUrl, 308);
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: ['/', '/(et|ru)/:path*', '/((?!api|static|.*\\..*|_next).*)'],
};
