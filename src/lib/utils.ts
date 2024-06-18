import { twMerge } from 'tailwind-merge';

import { type ClassValue, clsx } from 'clsx';
import { type Duration } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function calculateDuration(start: number, end: number): Duration {
  const durationMs: number = end - start;
  const minutes: number = Math.floor(durationMs / 60000);
  const seconds: number = Math.floor((durationMs % 60000) / 1000);
  return { minutes, seconds, durationMs };
};

export function calculateProgress(start: number, end: number, current: number): number {
  const durationMs: number = end - start;
  const elapsedMs: number = current - start;
  const progress: number = Math.min((elapsedMs / durationMs) * 100, 100);
  return progress;
};
