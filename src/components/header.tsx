'use client'

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { LangSwitcher } from '@/components/lang-switcher';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

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
    { title: t('header.tech-stack.title'), label: t('header.tech-stack.label'), url: t('header.tech-stack.link') },
    { title: t('header.career.title'), label: t('header.career.label'), url: t('header.career.link') },
    { title: t('header.projects.title'), label: t('header.projects.label'), url: t('header.projects.link') },
    { title: t('header.contact.title'), label: t('header.contact.label'), url: t('header.contact.link') },
  ];

  return (
    <header className='fixed top-0 z-10 flex items-center justify-center w-full mx-auto bg-background border-b py-2'>
      <nav className='hidden sm:flex justify-center items-center'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            aria-label={item.label}
            href={item.url}
            className={cn(
              'relative block mx-1 transition-colors ease-in-out py-2 md:px-4 px-2 rounded-md text-sm font-semibold hover:bg-accent',
              {
                'text-primary': currentSection === item.label,
              }
            )}
          >
            {item.title}
          </Link>
        ))}
        <div className='flex items-center ms-1'>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </nav>
      <div className='flex sm:hidden justify-between w-full px-2'>
        <div className='flex items-start'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' className='w-full'>
                <MenuIcon className='h-[1.2rem] w-[1.2rem]' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <div className='grid gap-4 py-4'>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    aria-label={item.label}
                    href={item.url}
                    className={cn(
                      'relative block mx-1 transition-colors ease-in-out py-2 md:px-4 px-2 rounded-md text-sm font-semibold hover:bg-secondary',
                      {
                        'text-primary': currentSection === item.label,
                      }
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className='flex items-start space-x-2'>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}