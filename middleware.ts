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
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline' https: http:;
      style-src 'self' 'nonce-${nonce}' 'unsafe-hashes' 
      'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk='
      'sha256-ZDrxqUOB4m/L0JWL/+gS52g1CRH0l/qwMhjTw5Z/Fsc='
      'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
      'sha256-EtMbx9k/muOjUy42QlSBZb6J88TNtSy99Y+VsAia0Mw='
      'sha256-tEd4lBbiysGj/wvNlLDvwZnlGLMloPzWaf2aUrdDBFE='
      'sha256-ci9xwDutagjdtNCnRmUkQW4727HuaEmJSYCcKZ+Mfyg='
      'sha256-nGgRbGz9hsufKfu+i0QGgvvWtZBIe2KnFhQalyWW+7o=';
      img-src 'self' data: https://cms.netihind.ee https://rxysmdetqttpdqfmrpym.supabase.co;
      font-src 'self' data:;
      connect-src 'self' http://127.0.0.1:54321 https://inaadress.maaamet.ee https://tshbfrxtlarxxnfegvyl.supabase.co https://rxysmdetqttpdqfmrpym.supabase.co https://api.resend.com https://region1.google-analytics.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
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
