'use client'

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { LangSwitcher } from '@/components/lang-switcher';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
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
    <header
      className='flex max-w-fit fixed top-3 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-background/80 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-2 py-2 items-center justify-center space-x-4'
      style={{ backdropFilter: 'blur(8px)' }} // Apply blur effect
    >
      <nav className='hidden sm:flex justify-center items-center'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            aria-label={item.label}
            href={item.url}
            className={cn(
              'relative block transition-colors ease-in-out py-2 md:px-4 px-2 rounded-full text-sm font-semibold hover:bg-accent',
              {
                'text-primary': currentSection === item.label,
              }
            )}
          >
            {item.title}
          </Link>
        ))}
        <div className='flex items-center mr-2'>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </nav>
      <div className='flex sm:hidden justify-between w-full px-2'>
        <div className='flex items-start mr-5'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='w-full'>
                <MenuIcon className='h-[1.2rem] w-[1.2rem]' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40 mt-2'>
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
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}