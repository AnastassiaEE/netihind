import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { Locale } from 'next-intl';
import { isLocale, normalizePath } from '@/utils/routesHelper';

export default async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  /* -------------------- REMOVE TRAILING SLASHES FROM SEARCH PARAMETERS -------------------- */

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

  /* -------------------- I18N MIDDLEWARE -------------------- */

  const handleI18nRouting = createMiddleware(routing);
  let response = handleI18nRouting(request);

  const pathname = request.nextUrl.pathname;
  const defaultLocale = routing.defaultLocale;

  const segments = pathname.split('/').filter(Boolean);

  let locale: Locale = defaultLocale;
  let pathnameWithoutLocale = pathname;

  if (segments[0] && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    locale = segments[0];
    pathnameWithoutLocale = '/' + segments.slice(1).join('/');
  }

  pathnameWithoutLocale = normalizePath(pathnameWithoutLocale);

  /* -------------------- PREPARE ISR (STATIC/SSG) PAGES -------------------- */

  const ssgBasePaths = ['/about', '/policy', '/blog', '/blog/[slug]'];

  const ssgPathsLocalized = ssgBasePaths.flatMap((path) => {
    const val = routing.pathnames[path as keyof typeof routing.pathnames];
    if (!val) return [];
    if (typeof val === 'string') return [normalizePath(val)];
    return Object.values(val).map(normalizePath);
  });

  const isStaticPage = ssgPathsLocalized.some((p) => {
    if (p.includes('[slug]')) {
      const base = p.replace('/[slug]', '');
      return pathnameWithoutLocale.startsWith(base + '/');
    }
    return pathnameWithoutLocale === p;
  });

  /* -------------------- CSP / NONCE -------------------- */

  const isDev = process.env.NODE_ENV === 'development';
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const scriptSrc =
    isDev || isStaticPage
      ? ["'self'", "'unsafe-inline'", '*']
      : ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", "https://www.googletagmanager.com", "https://www.google-analytics.com"];

  const connectSrc = isDev
    ? '*'
    : [
        "'self'",
        'https://inaadress.maaamet.ee',
        'https://tshbfrxtlarxxnfegvyl.supabase.co',
        'https://rxysmdetqttpdqfmrpym.supabase.co',
        'https://api.resend.com',
        'https://region1.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ].join(' ');

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc.join(' ')};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://cms.netihind.ee https://rxysmdetqttpdqfmrpym.supabase.co https://www.googletagmanager.com https://www.google-analytics.com;
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
