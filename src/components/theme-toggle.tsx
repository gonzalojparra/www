/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const startViewTransition = (document as any).startViewTransition;

    if (!startViewTransition) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    } else {
      startViewTransition.call(document, () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      });
    }
  };

  return (
    <div className='ml-2'>
      <Button
        aria-label='Toggle theme'
        className='rounded-full'
        size='icon'
        variant='ghost'
        onClick={toggleTheme}
      >
        <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </Button>
    </div>
  );
}
