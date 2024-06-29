import type {
  Duration,
  ErroredAPIResponse,
  LanyardResponse,
  Options,
  Snowflake,
} from '@/types/lanyard';

import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDuration(start: number, end: number): Duration {
  const durationMs: number = end - start;
  const minutes: number = Math.floor(durationMs / 60000);
  const seconds: number = Math.floor((durationMs % 60000) / 1000);

  return { minutes, seconds, durationMs };
}

export function calculateProgress(start: number, end: number, current: number): number {
  const durationMs: number = end - start;
  const elapsedMs: number = current - start;
  const progress: number = Math.min((elapsedMs / durationMs) * 100, 100);

  return progress;
}

export interface GetOptions extends Options {
  controller?: AbortController;
}

// Lanyard error handling
export class LanyardError extends Error {
  public readonly code: number;

  constructor(
    public readonly request: Request,
    public readonly response: Response,
    public readonly body: ErroredAPIResponse,
  ) {
    super(body.error.message);
    this.code = this.response.status;
  }
}

// Fetch Lanyard API
export async function getLanyard(id: Snowflake) {
  const lanyard = await fetch(`https://api.lanyard.rest/v1/users/${id}`).then(
    (res) => res.json() as Promise<LanyardResponse>,
  );

  if (!lanyard.success) {
    throw new Error('Lanyard API failed');
  }

  return lanyard.data;
}
