import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'Gonzalo Parra | Portfolio',
  description: 'My personal portfolio, showcasing my work and skills.',
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
        'min-h-screen bg-background font-sans antialiased',
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
