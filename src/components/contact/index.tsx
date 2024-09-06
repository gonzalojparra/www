import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MailIcon } from 'lucide-react';

import { data } from '@/constants';
import { Button } from '@/components/ui/button';

export function Contact() {
  const t = useTranslations();
  const { links } = data;

  return (
    <>
      <h2 className='flex items-center gap-x-4 text-balance text-3xl font-bold'>
        <MailIcon className='size-6' />
        {t('contact-section.title')}
      </h2>
      <div className='flex flex-col gap-4 text-pretty text-neutral-800 dark:text-neutral-200'>
        <p className='mx-auto max-w-3xl font-mono md:mb-4'>{t('contact-section.description')}</p>
      </div>
      <nav className='flex gap-x-4 pt-4'>
        {Array.isArray(links) &&
          links.map((link) => (
            <Button
              key={link.title}
              asChild
              className='rounded-lg px-2 shadow'
              size='default'
              variant='ghost'
            >
              <Link
                key={link.title}
                aria-label={link.title}
                className='flex items-center justify-center md:gap-2'
                href={link.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <link.icon className='size-6' />
                <p className='hidden md:block'>{link.title}</p>
              </Link>
            </Button>
          ))}
      </nav>
    </>
  );
}
