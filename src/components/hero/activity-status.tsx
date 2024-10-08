'use client';

import type { Data, SuccessfulAPIResponse } from '@/types/lanyard';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SpotifyIcon } from '@/components/icons/spotify';
import { statusClasses } from '@/data';
import { cn } from '@/lib/utils';

interface ActivityStatusProps {
  data?: SuccessfulAPIResponse<Data>['data'];
  isLoading?: boolean;
}

export function ActivityStatus({ data, isLoading }: ActivityStatusProps) {
  const t = useTranslations('about-section.activity');

  if (isLoading) {
    return (
      <div className='mt-1 flex flex-col'>
        <div className='h-4 w-24 animate-pulse rounded-md bg-muted' />
      </div>
    );
  }

  if (!data) return null;

  const { discord_status, listening_to_spotify, spotify } = data;

  // Map each discord status to its corresponding translation
  const statusMessages: {
    [key: string]: string;
  } = {
    offline: t('offline'),
    dnd: t('dnd'),
    idle: t('idle'),
    online: t('online'),
  };

  // If I'm not listening to Spotify or the data is not available
  if (!listening_to_spotify || !spotify) {
    const statusMessage = statusMessages[discord_status];

    if (statusMessage) {
      return (
        <motion.div
          animate={{ opacity: 3 }}
          className='flex flex-row items-center'
          initial={{ opacity: 0 }}
        >
          <p className={cn('font-mono text-sm font-medium', statusClasses[discord_status].text)}>
            {statusMessage}
          </p>
        </motion.div>
      );
    }
  }

  return (
    <motion.div animate={{ opacity: 3 }} initial={{ opacity: 0 }}>
      <div className='space-y-3'>
        <p className='-mb-2 font-mono text-sm font-bold'>{t('listening')}</p>
        <Link
          className='group relative !mb-1 block w-fit min-w-[300px] max-w-[400px] overflow-hidden rounded-xl rounded-bl-md p-3'
          href={`https://open.spotify.com/track/${spotify?.track_id}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          <div className='absolute -inset-[1px] z-20 rounded-xl rounded-bl-md border-[3px] border-black/10 dark:border-white/20' />

          <div className='absolute inset-0'>
            <div className='absolute inset-0 z-10 bg-white/70 transition-all group-hover:bg-white/80 dark:bg-neutral-800/80 dark:group-hover:bg-neutral-800/90' />
            <img
              aria-hidden
              alt='Album art'
              className='absolute top-1/2 -translate-y-1/2 scale-[3] blur-3xl saturate-[15] dark:saturate-[10]'
              src={spotify?.album_art_url ?? ''}
            />
          </div>

          <div className='relative z-50 flex items-center space-x-4 pr-8'>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    alt='Album art'
                    className='size-16 rounded-md border-2'
                    src={spotify?.album_art_url ?? ''}
                  />
                </TooltipTrigger>
                <TooltipContent className='mr-[34px]'>
                  <p className='text-neutral-800 dark:text-white/60'>{spotify?.album}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className='space-y-0 text-sm'>
              <p className='line-clamp-1'>
                <strong>{spotify?.song}</strong>
              </p>
              <p className='break-before-all text-neutral-800 dark:text-white/60'>
                {t('by')} {spotify?.artist.split('; ').join(', ')}
              </p>
            </div>
          </div>

          <div className='absolute right-4 top-4 z-10'>
            <SpotifyIcon className='size-4' />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
