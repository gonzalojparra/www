import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { SpotifyIcon } from '@/components/icons/spotify';

import { cn } from '@/lib/utils';
import { statusClasses } from '@/data';
import type { API, Data } from '@/types/lanyard';

export function ActivityStatus({ data }: API.SuccessfulAPIResponse<Data>) {
  const t = useTranslations('about-section.activity');
  const { discord_status, listening_to_spotify, spotify } = data;

  // Map each discord status to its corresponding translation
  const statusMessages: {
    [key: string]: string
  } = {
    offline: t('offline'),
    dnd: t('dnd'),
    idle: t('idle'),
    online: t('online')
  };

  // If I'm not listening to Spotify or the data is not available
  if (!listening_to_spotify || !spotify) {
    const statusMessage = statusMessages[discord_status];
    if (statusMessage) {
      return (
        <div className='flex flex-row items-center'>
          <p className={cn(
            'font-mono font-medium text-sm',
            statusClasses[discord_status].text
          )}>
            {statusMessage}
          </p>
        </div>
      );
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-full items-center gap-3 overflow-hidden px-2',
        spotify?.track_id && 'transition-transform active:scale-95'
      )}
    >
      <div className='bg-background rounded-lg flex items-center space-x-4 max-w-md'>
        <div className='flex items-center justify-center'>
          <Image
            alt={`${spotify?.song}`}
            className='w-[74px] rounded-md'
            src={spotify?.album_art_url || '/assets/album-placeholder.webp'}
            height={74}
            width={74}
            priority={true}
            quality={100}
          />
        </div>
        <div className='flex-1'>
          <div className='flex flex-row items-center justify-between'>
            <p className='font-bold text-sm uppercase text-green-600'>
              {t('listening')}
            </p>
            <SpotifyIcon className='ml-5 h-4 w-4' />
          </div>
          <Link
            href={`https://open.spotify.com/track/${spotify?.track_id}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium hover:underline'
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
