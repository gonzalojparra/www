import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Progress } from '@/components/ui/progress';
import { SpotifyIcon } from '@/components/icons/spotify';

import { calculateDuration, calculateProgress, cn } from '@/lib/utils';
import { type ActivityResponse } from '@/types';

export function ActivityStatus({ data }: ActivityResponse) {
  const [progress, setProgress] = useState<number>(0);

  const t = useTranslations('about-section.activity');

  // Update the progress bar every second while listening to Spotify
  useEffect(() => {
    if (data.spotify) {
      const { start, end } = data.spotify.timestamps;

      const updateProgress = () => {
        const current = Date.now();
        setProgress(calculateProgress(start, end, current));
      };

      updateProgress();
      const intervalId = setInterval(updateProgress, 1000);

      return () => clearInterval(intervalId);
    }
  }, [data.spotify]);

  // If I'm not online
  if (data.discord_status !== 'online') {
    return (
      <div className='flex flex-row items-center'>
        <p className='font-mono text-sm animate-pulse'>
          {t('offline')}
        </p>
      </div>
    );
  }

  // If I'm not listening to Spotify or the data is not available
  if (!data.listening_to_spotify || !data.spotify) {
    return (
      <div className='flex flex-row items-center'>
        <p className='font-mono text-sm animate-pulse'>
          {t('not-listening')}
        </p>
        <SpotifyIcon className='ml-5 h-4 w-4' />
      </div>
    );
  }

  // Calculate the duration of the song
  const { start, end } = data.spotify.timestamps;
  const { minutes, seconds } = calculateDuration(start, end);

  return (
    <div className={cn(
      'relative flex h-full items-center gap-3 overflow-hidden px-2',
      data.spotify.track_id && 'transition-transform active:scale-95',
    )}>
      <div className='flex flex-col'>
        <div className='bg-background rounded-lg flex items-center space-x-4 max-w-md'>
          <div className='w-[74px] flex items-center justify-center'>
            <img src={data.spotify.album_art_url} className='w-full rounded-md' />
          </div>
          <div className='flex-1'>
            <div className='flex flex-row items-center justify-between'>
              <p className='font-bold text-sm uppercase'>
                {t('listening')}
              </p>
              <SpotifyIcon className='ml-5 h-4 w-4' />
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
        <div className='flex justify-center items-center'>
          <Progress value={progress} className='h-1' />
          <span className='text-xs opacity-70 ml-2'>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
    </div>
  );
}