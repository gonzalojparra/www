'use client'

import { useLanyardWS } from '@/hooks/use-lanyard';

import { ActivityStatus } from '@/components/hero/activity-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { data } from '@/constants';
import { discordId, statusClasses } from '@/data';
import { type Data as LanyardData } from '@/types/lanyard';

export interface Props {
  lanyard: LanyardData,
};

export function AvatarProfile(props: Props) {
  const { avatar } = data;

  const lanyard = useLanyardWS(discordId, {
    initialData: props.lanyard
  })!;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={cn(
          'size-28 shadow cursor-pointer hover:border-4 transition-all',
          lanyard.discord_status && statusClasses[lanyard.discord_status].border
        )}>
          <AvatarImage alt={avatar.name} src='/assets/avatar.webp' />
          <AvatarFallback className='font-mono font-bold'>
            {avatar.initials}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent className='rounded-3xl ml-2' side='right'>
        <div className='flex h-full'>
          {lanyard && <ActivityStatus data={lanyard} success={true} />}
        </div>
      </TooltipContent>
    </Tooltip >
  )
}