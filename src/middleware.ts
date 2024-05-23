import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const nextIntlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
});

export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es)/:path*']
}