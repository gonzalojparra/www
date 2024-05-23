import { AVATAR, LINKS, PROJECTS } from '@/data';
import type {
  AvatarProps,
  LinksProps,
  ProjectProps
} from '@/types';

export const data = {
  avatar: AVATAR as AvatarProps,
  links: LINKS as unknown as LinksProps,
  projects: PROJECTS as ProjectProps[]
};