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
  let response = handleI18nRouting(request);

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
      style-src 'self' 'nonce-${nonce}';
      img-src 'self' data: https://cms.netihind.ee https://rxysmdetqttpdqfmrpym.supabase.co;
      font-src 'self';
      connect-src 'self' https://inaadress.maaamet.ee https://rxysmdetqttpdqfmrpym.supabase.co;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `;

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
