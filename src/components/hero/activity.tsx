'use client';

import { useState, useRef, useEffect } from 'react';

import { ActivityStatus } from '@/components/hero/activity-status';
import { useLanyardWS } from '@/hooks/use-lanyard';
import { discordId } from '@/data';

export function Activity() {
  const lanyard = useThrottle(useLanyardWS(discordId));

  return <ActivityStatus data={lanyard} isLoading={!lanyard} />;
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
