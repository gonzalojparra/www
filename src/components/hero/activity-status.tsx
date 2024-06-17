import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { SpotifyIcon } from '@/components/icons/spotify';

import { cn } from '@/lib/utils';
import { type ActivityResponse } from '@/types';

export function ActivityStatus({ data }: ActivityResponse) {
  const t = useTranslations('about-section.activity');

  return (
    <div
      className={cn(
        'relative flex h-full items-center gap-3 overflow-hidden px-2',
        data.spotify?.track_id && 'transition-transform active:scale-95',
      )}
    >
      {data.discord_status === 'online' ? (
        data.listening_to_spotify && data.spotify ? (
          <div className='bg-background rounded-lg flex items-center space-x-4 max-w-md'>
            <div className='w-20 flex items-center justify-center'>
              <img src={data.spotify.album_art_url} className='w-full rounded-md' />
            </div>
            <div className='flex-1'>
              <div className='flex flex-row items-center justify-between'>
                <p className='font-bold text-sm uppercase'>
                  {t('listening')}
                </p>
                <SpotifyIcon className='h-4 w-4' />
              </div>
              <Link
                href={`https://open.spotify.com/track/${data.spotify.track_id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-medium hover:underline'
              >
                {data.spotify.song}
              </Link>
              <p className='text-xs opacity-90'>
                {t('by')} {data.spotify.artist}
              </p>
              <p className='text-xs opacity-70'>
                {t('from')} {data.spotify.album}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-row items-center'>
            <p className='font-mono text-sm animate-pulse'>
              {t('not-listening')}
            </p>
            <SpotifyIcon className='ml-5 h-4 w-4' />
          </div>
        )
      ) : (
        <div className='flex flex-row items-center'>
          <p className='font-mono text-sm animate-pulse'>
            {t('offline')}
          </p>
        </div>
      )}
    </div>
  )
}