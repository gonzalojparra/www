import { MailIcon } from 'lucide-react';

import { GitHubIcon } from '@/components/icons/github';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { DiscordIcon } from '@/components/icons/discord';
import { InstagramIcon } from '@/components/icons/instagram';
import { XIcon } from '@/components/icons/x';

export const AVATAR = {
  name: 'Gonzalo Parra',
  initials: 'GP',
};

export const discordId = '654163755797577747';

export const LINKS = [
  { title: 'Email', url: 'mailto:gonzzaparra@gmail.com', icon: MailIcon },
  { title: 'Instagram', url: 'https://www.instagram.com/gonzaparra_/', icon: InstagramIcon },
  { title: 'X (Twitter)', url: 'https://x.com/_gonzaparra', icon: XIcon },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/gonzalojparra/', icon: LinkedInIcon },
  { title: 'GitHub', url: 'https://github.com/gonzalojparra', icon: GitHubIcon },
  { title: 'Discord', url: 'https://discord.com/users/654163755797577747', icon: DiscordIcon },
];

export const statusClasses: {
  [key: string]: {
    border: string;
    text: string;
  };
} = {
  online: {
    border: 'hover:border-green-500',
    text: 'text-green-600',
  },
  dnd: {
    border: 'hover:border-red-500',
    text: 'text-red-500',
  },
  idle: {
    border: 'hover:border-amber-200',
    text: 'dark:text-amber-200 text-yellow-600',
  },
  offline: {
    border: 'hover:border-purple-100',
    text: 'dark:text-purple-100 text-primary',
  },
};
