import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { AvatarProfile } from '@/components/hero/avatar-profile';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BadgeCheckIcon } from 'lucide-react';

import { data } from '@/constants';
import { discordId } from '@/data';
import { getLanyard } from '@/lib/utils';

export async function Hero() {
  const { links } = data;
  const t = useTranslations();

  const lanyard = await getLanyard(discordId);

  return (
    <>
      <div className='flex flex-row items-center'>
        <AvatarProfile lanyard={lanyard} />
      </div>

      <div className='flex items-center flex-row gap-4'>
        <h1 className='flex dark:text-neutral-100 text-neutral-900 text-4xl font-bold text-balance'>
          Gonzalo Parra
        </h1>
        <Link
          href='https://www.linkedin.com/in/gonzalojparra/'
          target='_blank'
          rel='noopener noreferrer'
          className='hidden md:flex rounded-full'
        >
          <Badge
            variant='default'
            className='font-mono font-bold text-xs hover:scale-105 transition-all ease-in-out duration-200'
          >
            {t('about-section.open-to-work')}
          </Badge>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='https://www.linkedin.com/in/gonzalojparra/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('about-section.open-to-work')}
              className='md:hidden flex rounded-full hover:scale-105 transition-all ease-in-out duration-300'
            >
              <BadgeCheckIcon className='size-6 fill-secondary' />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('about-section.open-to-work')}</p>
          </TooltipContent>
        </Tooltip>
      </div >

      <div className='flex flex-col font-mono gap-4 dark:text-neutral-200 text-neutral-800 text-pretty'>
        <h2>{t('about-section.title')}</h2>
        <p>{t('about-section.description')}</p>
      </div>

      <nav className='flex gap-x-4 pt-4'>
        {Array.isArray(links) && links.map((link) => (
          <Button
            variant='ghost'
            size='default'
            key={link.title}
            className='px-2 shadow rounded-lg'
            asChild
          >
            <Link
              key={link.title}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={link.title}
              className='flex justify-center items-center md:gap-2'
            >
              <link.icon className='size-6' />
              <p className='hidden md:block'>{link.title}</p>
            </Link>
          </Button>
        ))}
      </nav>

    </>
  )
}