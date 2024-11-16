import type { Locale } from '@/i18n/request';
import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ThemeProvider } from '@/components/theme-provider';
import { EasterEgg } from '@/components/easter-egg';
import { Lights } from '@/components/ui/lights';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const title = 'Gonzalo Parra';
const description = 'My personal website, showcasing my work and skills.';
const ogImage = 'https://gonzalojparra.vercel.app/og-image.png';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    siteName: title,
    url: 'https://gonzalojparra.vercel.app',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@_gonzaparra',
    images: [
      {
        url: ogImage,
        alt: title,
      },
    ],
  },
  creator: 'Gonzalo Parra',
};

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning
      className={cn(
        'min-h-screen scroll-smooth bg-background font-sans antialiased',
        GeistSans.variable,
        GeistMono.variable,
      )}
      lang={locale}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ViewTransitions>
            <ThemeProvider enableSystem attribute='class' defaultTheme='system'>
              <EasterEgg />
              <Lights className='animate-appear opacity-0' />
              <main className='relative flex min-h-screen flex-col px-4 pb-8 pt-24'>
                <div className='flex flex-1 items-center justify-center'>
                  <Header />
                  {children}
                </div>
                <Footer />
              </main>
              <Toaster />
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
          </ViewTransitions>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
