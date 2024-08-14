import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BadgeCheckIcon } from 'lucide-react';

import { AvatarProfile } from '@/components/hero/avatar-profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { data } from '@/constants';
import { discordId } from '@/data';
import { getLanyard } from '@/lib/utils';

export async function Hero() {
  const { links } = data;
  const t = useTranslations();

  const lanyard = await getLanyard(discordId);

  return (
    <>
      {/* <div className='flex flex-row items-center'>
        <AvatarProfile lanyard={lanyard} />
      </div> */}

      <div className='mt-4 flex flex-row items-center gap-4'>
        <h1 className='flex text-balance text-4xl font-bold text-neutral-900 dark:text-neutral-100'>
          Gonzalo Parra
        </h1>
        <Link
          className='hidden rounded-full md:flex'
          href='https://www.linkedin.com/in/gonzalojparra/'
          rel='noopener noreferrer'
          target='_blank'
        >
          <Badge
            className='font-mono text-xs font-bold transition-all duration-200 ease-in-out hover:scale-105'
            variant='default'
          >
            {t('about-section.open-to-work')}
          </Badge>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              aria-label={t('about-section.open-to-work')}
              className='flex rounded-full transition-all duration-300 ease-in-out hover:scale-105 md:hidden'
              href='https://www.linkedin.com/in/gonzalojparra/'
              rel='noopener noreferrer'
              target='_blank'
            >
              <BadgeCheckIcon className='size-6 fill-secondary' />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('about-section.open-to-work')}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className='flex flex-col gap-4 text-pretty font-mono text-neutral-800 dark:text-neutral-200'>
        <h2>{t('about-section.title')}</h2>
        <p>{t('about-section.description')}</p>
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
