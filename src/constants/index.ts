import { AVATAR, LINKS, STACK, PROJECTS } from '@/data';
import type {
  AvatarProps,
  LinksProps,
  ProjectProps,
  StackProps
} from '@/types/components';

export const data = {
  avatar: AVATAR as AvatarProps,
  links: LINKS as unknown as LinksProps,
  stack: STACK as unknown as StackProps[],
  projects: PROJECTS as ProjectProps[]
};