import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { cn } from '@/lib/utils';
import '@/app/globals.css';

type Props = {
  children: React.ReactNode;
  params: {
    locale: 'en' | 'es'
  };
};

const title = 'Gonzalo Parra | Portfolio';
const description = 'My personal portfolio, showcasing my work and skills.';
const openGraphImage = 'https://portfolio-gonzalojparra.vercel.app/opengraph-image.png';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: title,
      }
    ]
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@_gonzaparra',
    images: [
      {
        url: openGraphImage,
        alt: title,
      }
    ]
  },
  creator: 'Gonzalo Parra',
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<Props>) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(
        'min-h-screen bg-background font-sans antialiased overflow-y-scroll scroll-smooth',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <TooltipProvider>
              <main className='flex flex-col items-center justify-center min-h-screen pt-24 pb-8 px-4'>
                <Header />
                {children}
                <Footer />
              </main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
