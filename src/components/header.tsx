import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

import { cn } from '@/lib/utils';

export function Header() {
  const navItems = [
    { title: 'About', label: 'about', url: '#about' },
    { title: 'Career', label: 'career', url: '#career' },
    { title: 'Projects', label: 'projects', url: '#projects' },
    { title: 'Contact', label: 'contact', url: '#contact' },
  ];

  return (
    <header className='fixed top-0 z-10 flex items-center justify-center w-full mx-auto bg-background border-b py-2'>
      <nav className='flex justify-center items-center'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            aria-label={item.label}
            href={item.url}
            className={cn(
              'relative block mx-1 transition-colors ease-in-out py-2 md:px-4 px-2 rounded-md text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800'
              // TODO: Add statement to check if the current section is the same as the link
            )}
          >
            {item.title}
          </Link>
        ))}
        <div className='flex items-center ms-1'>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}