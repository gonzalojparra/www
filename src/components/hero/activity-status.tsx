import type { Data, SuccessfulAPIResponse } from '@/types/lanyard';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { SpotifyIcon } from '@/components/icons/spotify';
import { cn } from '@/lib/utils';
import { statusClasses } from '@/data';

export function ActivityStatus({ data }: SuccessfulAPIResponse<Data>) {
  const t = useTranslations('about-section.activity');
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
        <div className='flex flex-row items-center'>
          <p className={cn('font-mono text-sm font-medium', statusClasses[discord_status].text)}>
            {statusMessage}
          </p>
        </div>
      );
    }
  }

  return (
    <div className='relative flex h-full items-center gap-3 overflow-hidden px-2'>
      <div className='flex max-w-md items-center space-x-4 rounded-lg bg-background'>
        <div className='flex items-center justify-center'>
          <Image
            priority
            alt={`${spotify?.song}`}
            className='w-[74px] rounded-md'
            height={74}
            quality={100}
            src={spotify?.album_art_url || '/assets/album-placeholder.webp'}
            width={74}
          />
        </div>
        <div className='flex-1'>
          <div className='flex flex-row items-center justify-between'>
            <p className='text-sm font-bold uppercase text-green-600'>{t('listening')}</p>
            <SpotifyIcon className='ml-5 h-4 w-4' />
          </div>
          <Link
            className='text-sm font-medium hover:underline'
            href={`https://open.spotify.com/track/${spotify?.track_id}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            {spotify?.song}
          </Link>
          <p className='text-xs opacity-90'>
            {t('by')} {spotify?.artist}
          </p>
          <p className='text-xs opacity-70'>
            {t('from')} {spotify?.album}
          </p>
        </div>
      </div>
    </div>
  );
}
