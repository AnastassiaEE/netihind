import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const updatedSearchParams = new URLSearchParams();
  let needsRedirect = false;

  const isDev = process.env.NODE_ENV === 'development';

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

  const scriptSrc = isDev
  ? ["'self'", "'unsafe-inline'", "*"] 
  : ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"];

  const connectSrc = isDev
  ? "*" 
  : [
      "'self'",
      "https://inaadress.maaamet.ee",
      "https://tshbfrxtlarxxnfegvyl.supabase.co",
      "https://rxysmdetqttpdqfmrpym.supabase.co",
      "https://api.resend.com",
      "https://region1.google-analytics.com",
    ].join(' ');

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc.join(' ')};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://cms.netihind.ee https://rxysmdetqttpdqfmrpym.supabase.co;
    font-src 'self' data:;
    connect-src ${connectSrc};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
