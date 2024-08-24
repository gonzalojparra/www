import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';
import { type Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { type Locale } from '@/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';
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
const ogImage = 'https://portfolio-gonzalojparra.vercel.app/og-image.png';

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

export default async function RootLayout({ children, params: { locale } }: Readonly<Props>) {
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
              <TooltipProvider>
                <main className='flex min-h-screen flex-col px-4 pb-8 pt-24'>
                  <div className='flex flex-1 items-center justify-center'>
                    <Header />
                    {children}
                  </div>
                  <Footer />
                </main>
                <Toaster />
              </TooltipProvider>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
          </ViewTransitions>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
