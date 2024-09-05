'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/theme-toggle';
import { LangSwitcher } from '@/components/lang-switcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio('/pop.mp3');

    audio.volume = 0.5;

    audio.play().catch(() => null);
  }, [pathname]);

  const navItems = [
    {
      title: t('header.home.title'),
      label: t('header.home.label'),
      url: t('header.home.link'),
    },
    {
      title: t('header.career.title'),
      label: t('header.career.label'),
      url: t('header.career.link'),
    },
    {
      title: t('header.contact.title'),
      label: t('header.contact.label'),
      url: t('header.contact.link'),
    },
  ];

  return (
    <header
      className='fixed inset-x-0 top-3 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-background/80 px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2]'
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <nav className='flex items-center justify-center'>
        {navItems.map(({ title, label, url }) => (
          <div key={label}>
            <Link
              className={cn(
                'relative block transform-gpu rounded-full px-3 py-2 text-sm transition-all',
                pathname == url ? '' : 'hover:opacity-50',
              )}
              href={url}
            >
              {pathname == url && (
                <motion.div
                  className='absolute inset-0 rounded-full bg-accent backdrop-blur-sm dark:bg-primary'
                  layoutId='active'
                  transition={{ type: 'spring', duration: '0.8' }}
                />
              )}
              <span className='relative z-10'>{title}</span>
            </Link>
          </div>
        ))}
        <div className='mr-2 flex items-center'>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </nav>
    </header>
  );
}
