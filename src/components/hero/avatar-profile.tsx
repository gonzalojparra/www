'use client'

import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActivityStatus } from '@/components/hero/activity-status';

import { cn } from '@/lib/utils';
import { data } from '@/constants';
import { statusClasses } from '@/data';
import { type ActivityResponse } from '@/types';

export function AvatarProfile() {
  const [status, setStatus] = useState<string>('');
  const [activity, setActivity] = useState<ActivityResponse | null>(null);

  const { avatar } = data;

  const url = 'https://api.lanyard.rest/v1/users/654163755797577747';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setStatus(data.data.discord_status);
      });
  }, [activity]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={cn(
          'size-28 shadow cursor-pointer hover:border-4 transition-all',
          status && statusClasses[status].border
        )}>
          <AvatarImage alt={avatar.name} src='/assets/avatar.webp' />
          <AvatarFallback className='font-mono font-bold'>
            {avatar.initials}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent className='rounded-3xl ml-2' side='right'>
        <div className='flex h-full'>
          {activity?.data && <ActivityStatus data={activity.data} />}
        </div>
      </TooltipContent>
    </Tooltip >
  )
}