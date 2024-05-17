import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gonzalo Parra | Portfolio',
  description: 'My personal portfolio, showcasing my work and skills.',
  creator: 'Gonzalo Parra',
  keywords: ['portfolio', 'developer', 'web', 'front end', 'react', 'next.js', 'argentina', 'neuquén', 'software', 'engineer', 'design', 'web development', 'runas software', 'national university of comahue']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'min-h-screen bg-background font-sans antialiased overflow-y-scroll scroll-smooth',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body>
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
      </body>
    </html>
  );
}
