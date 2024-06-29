import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type CareerProps } from '@/types/components';

export function CareerItem({
  link,
  company,
  badges,
  title,
  start,
  end,
  description,
  viewMore,
}: CareerProps) {
  const badgeArray = badges ? badges.split(',') : [];

  return (
    <>
      <div className='absolute -start-1.5 mt-2 size-3 rounded-full border border-primary bg-background' />
      <time className='font-mono text-sm leading-none text-neutral-800 dark:text-neutral-200'>
        {start} — {end}
      </time>
      <h3 className='mt-1 text-xl font-bold text-neutral-900 dark:text-neutral-100'>{company}</h3>
      {badgeArray.map((badge) => (
        <Badge
          key={badge}
          className='my-2 mr-2 rounded-md shadow hover:bg-secondary'
          variant='outline'
        >
          {badge}
        </Badge>
      ))}
      <h4 className='mt-2 text-lg font-medium text-neutral-900 dark:text-neutral-100'>{title}</h4>
      <p className='mt-1 text-pretty font-mono text-neutral-800 dark:text-neutral-200'>
        {description}
      </p>

      {link ? (
        <Button className='mt-4 px-3 shadow' size='default' variant='default'>
          <Link className='flex items-center' href={link} rel='noopener noreferrer' target='_blank'>
            <p className='font-medium'>{viewMore}</p>
            <ArrowRightIcon className='ms-2 size-4' />
          </Link>
        </Button>
      ) : null}
    </>
  );
}
