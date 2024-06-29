'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import { LangSwitcher } from '@/components/lang-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function Header() {
  const [currentSection, setCurrentSection] = useState('');
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentId = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 2) {
          currentId = section.id;
        }
      });

      setCurrentSection(currentId);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { title: t('header.about.title'), label: t('header.about.label'), url: t('header.about.link') },
    {
      title: t('header.tech-stack.title'),
      label: t('header.tech-stack.label'),
      url: t('header.tech-stack.link'),
    },
    {
      title: t('header.career.title'),
      label: t('header.career.label'),
      url: t('header.career.link'),
    },
    {
      title: t('header.projects.title'),
      label: t('header.projects.label'),
      url: t('header.projects.link'),
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
      <nav className='hidden items-center justify-center sm:flex'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            aria-label={item.label}
            className={cn(
              'relative block rounded-full px-2 py-2 text-sm font-semibold transition-colors ease-in-out hover:bg-accent md:px-4',
              {
                'text-primary': currentSection === item.label,
              },
            )}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
        <div className='mr-2 flex items-center'>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </nav>
      <div className='flex w-full justify-between px-2 sm:hidden'>
        <div className='mr-5 flex items-start'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='w-full' variant='ghost'>
                <MenuIcon className='h-[1.2rem] w-[1.2rem]' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mt-2 w-40'>
              <div className='grid gap-4 py-4'>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    aria-label={item.label}
                    className={cn(
                      'relative mx-1 block rounded-md px-2 py-2 text-sm font-semibold transition-colors ease-in-out hover:bg-secondary md:px-4',
                      {
                        'text-primary': currentSection === item.label,
                      },
                    )}
                    href={item.url}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}
