'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { ArrowRight, LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { data } from '@/constants';

export function CommandMenu() {
  const router = useRouter();
  const t = useTranslations();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const { links } = data;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        className='group flex h-8 w-full justify-center rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        variant='ghost'
        onClick={() => setOpen(true)}
      >
        <span className='hidden md:inline'>{t('footer.command-menu.press')}</span>
        <kbd className='pointer-events-none mx-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          ⌘ K
        </kbd>
        <span className='inline md:hidden'>Click </span>
        <span className='mr-2'>{t('footer.command-menu.to-explore')}</span>
        <ArrowRight
          className='duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-full md:opacity-0'
          size='1em'
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('footer.command-menu.placeholder')} />
        <CommandList>
          <CommandEmpty>{t('footer.command-menu.empty')}</CommandEmpty>
          <CommandGroup heading='Links'>
            {Array.isArray(links) &&
              links.map((link) => (
                <CommandItem
                  key={link.url}
                  value={link.title}
                  onSelect={() => runCommand(() => router.push(link.url))}
                >
                  <link.icon className='mr-2 h-4 w-4' />
                  {link.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className='mr-2 h-4 w-4' />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className='mr-2 h-4 w-4' />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className='mr-2 h-4 w-4' />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
