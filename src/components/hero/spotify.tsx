'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { SpotifyIcon } from '@/components/icons/spotify';
import { useLanyardWS } from '@/hooks/use-lanyard';
import { Snowflake } from '@/types/lanyard';

interface SpotifyProps {
  id: Snowflake;
}

export function Spotify({ id }: SpotifyProps) {
  const data = useThrottle(useLanyardWS(id));

  useEffect(() => {
    if (!data || !data.spotify) return;
  }, [data]);

  if (!data || !data.spotify) return null;

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className='space-y-3'>
        <Link
          className='group relative !mb-1 block w-fit min-w-[300px] overflow-hidden rounded-xl rounded-bl-md p-3'
          href={`https://open.spotify.com/track/${data.spotify.track_id}`}
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
              src={data.spotify.album_art_url ?? ''}
            />
          </div>

          <div className='relative z-10 flex items-center space-x-4 pr-8'>
            <img
              alt='Album art'
              className='size-14 rounded-md border-2'
              src={data.spotify.album_art_url ?? ''}
            />

            <div className='space-y-1'>
              <p className='line-clamp-1'>
                <strong>{data.spotify.song}</strong>
              </p>
              <p className='line-clamp-1 text-neutral-800 dark:text-white/60'>
                {data.spotify.artist.split('; ').join(', ')}
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

/**
 * Custom hook that throttles the value based on a specified time limit.
 * @template T - The type of the value being throttled.
 * @param {T} value - The value to be throttled.
 * @param {number} [limit=1000] - The time limit in milliseconds.
 * @returns {T} - The throttled value.
 */
function useThrottle<T>(value: T, limit: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
