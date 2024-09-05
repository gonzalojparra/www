import type React from 'react';

import { cn } from '@/lib/utils';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

export function Section({ className, ...props }: BadgeProps) {
  return (
    <section
      className={cn('mx-auto flex min-h-0 w-full flex-col gap-y-4 md:max-w-3xl', className)}
      id={props.id}
      {...props}
    />
  );
}
