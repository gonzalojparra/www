import { JSX, ClassAttributes, AnchorHTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Spotify } from '@/components/hero/spotify';
import { Button } from '@/components/ui/button';
import { data } from '@/constants';
import { discordId } from '@/data';

export async function Hero() {
  const { links } = data;
  const t = useTranslations();

  return (
    <>
      <div className='mt-4 flex flex-row items-center gap-4'>
        <h1 className='flex text-balance text-4xl font-bold text-neutral-900 dark:text-neutral-100'>
          Gonzalo Parra
        </h1>
      </div>

      <div className='flex flex-col gap-4 text-pretty font-mono text-neutral-800 dark:text-neutral-200'>
        <p className='-mt-2 mb-4 text-sm font-light'>{t('about-section.sub-title')}</p>
        <h2>{t('about-section.title')}</h2>
        <p>
          {t('about-section.description')}{' '}
          <Badge href='https://incubator.com.ar/'>
            <img
              aria-label='Incubator logo'
              className='mr-1 inline-flex'
              height='11'
              src='/logo.png'
              width='13'
            />
            {t('about-section.incubator')}
          </Badge>
          {', '}
          {t('about-section.incubator-about')}
        </p>
        <p>{t('about-section.description-2')}</p>
      </div>

      <div>
        <Spotify id={discordId} />
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

function Badge(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { children, ...rest } = props;

  return (
    <a
      {...rest}
      className='inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'
      target='_blank'
    >
      {children}
    </a>
  );
}
