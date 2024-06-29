'use client';

import { useLanyardWS } from '@/hooks/use-lanyard';
import { ActivityStatus } from '@/components/hero/activity-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { data } from '@/constants';
import { discordId, statusClasses } from '@/data';
import { type Data as LanyardData } from '@/types/lanyard';

export interface Props {
  lanyard: LanyardData;
}

export function AvatarProfile(props: Props) {
  const { avatar } = data;

  const lanyard = useLanyardWS(discordId, {
    initialData: props.lanyard,
  })!;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar
          className={cn(
            'size-28 cursor-pointer shadow transition-all hover:border-4',
            lanyard.discord_status && statusClasses[lanyard.discord_status].border,
          )}
        >
          <AvatarImage alt={avatar.name} src='/assets/avatar.webp' />
          <AvatarFallback className='font-mono font-bold'>{avatar.initials}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          'ml-2 rounded-3xl dark:shadow-primary/20',
          lanyard.spotify?.track_id && 'transition-transform active:scale-95',
        )}
        side='right'
      >
        <div className='flex h-full'>
          {lanyard ? <ActivityStatus success data={lanyard} /> : null}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
